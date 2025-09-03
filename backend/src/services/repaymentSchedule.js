const { format } = require('date-fns')
const { SendEmailNotification } = require('./messages')
const { getAdminUserEmailsAndNumbers } = require('./getAdminUserEmailsAndNumbers')
const { calculateLoan, amortization } = require('./intererestCalculation')
const {  createReferralEarning } = require('./referallPayments')
const { connect } = require('puppeteer')

/**
 * Generate a repayment schedule for a loan using only loanId.
 * @param {Number} loanId
 * Validates that no Schedule item has moved past “pending.”
 * If one has, notifies admins and throws an Error.
 *
 * @param {Number} scheduleId
 * @returns {Promise<void>}
 * @throws {Error} with a user‑friendly message if the schedule is locked
 */



async function createSchedule(loanId) {
  try {
    const loan = await strapi.db.query('api::loan.loan').findOne({
      where: { id: loanId },
      populate: ['loanType', 'client'],
    })
    if (!loan) throw new Error('Loan not found')

    const { disbursementDate, loanAmount: principal, loanTerm: termMonths, loanType } = loan

    // Compute loan terms via shared calculator
    const calcResult = await calculateLoan({ amount: principal, loanType: {typeName:loanType.typeName}, termMonths })
    let monthlyPayment
    const totalInterest = parseFloat(calcResult.totalInterest)

    if (calcResult.monthlyPayment != null) {
      monthlyPayment = parseFloat(calcResult.monthlyPayment)
    } else if (calcResult.totalPayment != null) {
      // Fallback amortization for salary-based or missing monthlyPayment
      const loanInfo = await strapi.db.query('api::loans-information.loans-information').findOne()
      const annualRatePercent = loanType.typeName === 'salaryBased'
        ? loanInfo.defaultSalaryLoanInterestRate * 12
        : loanInfo.defaultCollaterallLoanInterestRate * 12
      const amort = amortization({ principal, annualRatePercent, termMonths })
      monthlyPayment = parseFloat(amort.monthlyPayment)
    } else {
      throw new Error('Unable to determine monthlyPayment')
    }

    // Build schedule array
    const Schedule = []
    for (let i = 1; i <= termMonths; i++) {
      const dueDateObj = new Date()
      dueDateObj.setMonth(dueDateObj.getMonth() + i)
      
      const interestDue = parseFloat((totalInterest / termMonths).toFixed(2))
      const principalDue = parseFloat((monthlyPayment - interestDue).toFixed(2))

      Schedule.push({
        dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
        dueDate: dueDateObj.toISOString(),
        principalDue,
        interestDue,
        status: 'pending',
        paidAmount: 0,
        paidAt: null,
        lateFee: 0,
      })
    }

    // Upsert component schedule
    const existing = await strapi.entityService.findMany('api::repayment-schedule.repayment-schedule', {
      filters: { loan: loanId },
      populate: ['Schedule'],
      limit: 1
    })

    if (existing.length) {
      return strapi.entityService.update(
        'api::repayment-schedule.repayment-schedule',
        existing[0].id,
        { data: { Schedule } }
      )
    } else {
       return strapi.entityService.create('api::repayment-schedule.repayment-schedule', {
        data: { loan: loanId, Schedule },
      })
    }
     
  } catch (err) {
    console.error('createSchedule error:', err)
    return []
  }
}

/**
 * Retrieve the repayment schedule for a given loan
 */
async function getSchedule(loanId) {
  try {
    const result = await strapi.db.query('api::repayment-schedule.repayment-schedule').findMany({
      where: { loan: loanId },
      populate: ['Schedule'],
      limit: 1,
    })
    return result.length ? result[0].Schedule : []
  } catch (err) {
    console.error('getSchedule error:', err)
    return []
  }
}

/**
 * Record a payment against the next due installment
 */

async function recordPayment(loanId, amount, paymentDate, repaymentId) {
  try {
    // 1. Load the schedule, oldest first
    const entries = await strapi.entityService.findMany(
      'api::repayment-schedule.repayment-schedule',
      { filters: { loan: loanId }, populate: ['Schedule'], limit: 1 }
    )
    if (!entries.length) {
      console.error('recordPayment: Schedule not found for loan', loanId)
      return []
    }
    const entry = entries[0]
    // sort by dueDate ascending
    const schedule = (entry.Schedule || []).slice()
      .sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))

    // 2. Walk through installments, applying payment
    let remaining = parseFloat(amount)
    const updated = schedule.map(item => {
      if (remaining <= 0) {
        return item
      }

      // compute what remains due on this item
      const fullDue = parseFloat(item.principalDue + item.interestDue + (item.lateFee||0))
      const outstanding = parseFloat(fullDue - (item.paidAmount || 0))

      if (outstanding <= 0) {
        // already fully paid
        return item
      }

      const paymentApplied = Math.min(remaining, outstanding)
      remaining = parseFloat((remaining - paymentApplied).toFixed(2))

      // apply to paidAmount
      const newPaid = parseFloat(((item.paidAmount || 0) + paymentApplied).toFixed(2))
      // connect the repaymentId
      item.repayments = { connect:[repaymentId] }

      // clear lateFee first: if item.lateFee > 0 and paymentApplied > 0
      let lateFeeCleared = 0
      if (item.lateFee && item.lateFee > 0) {
        const lf = Math.min(item.lateFee, paymentApplied)
        item.lateFee = parseFloat((item.lateFee - lf).toFixed(2))
        lateFeeCleared = lf
      }

      // recalc paidAmount and status
      item.paidAmount = newPaid
      const principalPlusInterest = parseFloat(item.principalDue + item.interestDue)
      if (newPaid >= principalPlusInterest + lateFeeCleared) {
        item.status = 'paid'
        item.paidAt = paymentDate? new Date(paymentDate).toISOString() : new Date()
       // createReferralEarning(loanId,parseFloat(item.interestDue)) // a refferer only gets commision from the interest when paid in full
      } else {
        // if it was late, remain late; otherwise partial
        item.status = (item.status === 'late') ? 'late' : 'partial'
      }

      return item
    })

    // 3. Write back the updated Schedule array (preserving component relations)
    await strapi.entityService.update(
      'api::repayment-schedule.repayment-schedule',
      entry.id,
      { data: { Schedule: updated } }
    )

    // 4. Mark the loan as having a payment schedule (so it can’t be overwritten)
    await strapi.db.query('api::loan.loan').update({
      where: { id: loanId },
      data: { paymentScheduleCreated: true },
    })

    return updated
  } catch (err) {
    console.error('recordPayment error:', err)
    return []
  }
}


/**
 * Generate a repayment schedule using the "Criteria2" logic:
 * - Month 1: Capitalize all interest/fees (add to principal), payment is fixed (from config or calculated)
 * - Months 2 to (n-1): Payment is fixed, reduces balance
 * - Last month: Pay off remaining balance (principal + any remaining interest/fees)
 * 
 * This function uses loan information constants for interest calculation and payment amounts.
 */
async function createScheduleCriteria2(loanId) {
  try {
    const loan = await strapi.db.query('api::loan.loan').findOne({
      where: { id: loanId },
      populate: ['loanType', 'client'],
    });
    if (!loan) throw new Error('Loan not found');

    const { disbursementDate, loanAmount: principal, loanTerm: termMonths, loanType } = loan;

    // Get loan info constants
    const loanInfo = await strapi.db.query('api::loans-information.loans-information').findOne();
    const annualRatePercent = loanType.typeName === 'salaryBased'
      ? loanInfo.defaultSalaryLoanInterestRate * 12
      : loanInfo.defaultCollaterallLoanInterestRate * 12;

    // Calculate total interest for the term (simple interest)
    const totalInterest = principal * (annualRatePercent / 100) * (termMonths / 12);

    // Determine fixed payment for months 1 to (n-1)
    // You can use a config value or calculate as a fraction of total interest
    // For this example, we'll use 9000 or (totalInterest / termMonths), whichever is lower
    let fixedPayment = loanInfo.defaultMonthlyInterestPayment || 9000;
    if (fixedPayment * termMonths > totalInterest) {
      fixedPayment = parseFloat((totalInterest / termMonths).toFixed(2));
    }

    // Build schedule array
    const Schedule = [];
    let balance = principal + totalInterest; // After capitalizing interest in month 1

    for (let i = 1; i <= termMonths; i++) {
      const dueDateObj = new Date(disbursementDate || Date.now());
      dueDateObj.setMonth(dueDateObj.getMonth() + i);

      if (i === 1) {
        // Month 1: Capitalize all interest/fees
        Schedule.push({
          dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
          dueDate: dueDateObj.toISOString(),
          principalDue: 0,
          interestDue: totalInterest,
          paymentAmount: fixedPayment,
          status: 'pending',
          paidAmount: 0,
          paidAt: null,
          lateFee: 0,
          remainingBalance: balance,
        });
      } else if (i < termMonths) {
        // Months 2 to (n-1): Payment reduces balance
        balance -= fixedPayment;
        Schedule.push({
          dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
          dueDate: dueDateObj.toISOString(),
          principalDue: 0,
          interestDue: fixedPayment,
          paymentAmount: fixedPayment,
          status: 'pending',
          paidAmount: 0,
          paidAt: null,
          lateFee: 0,
          remainingBalance: balance,
        });
      } else {
        // Last month: Pay off everything
        Schedule.push({
          dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
          dueDate: dueDateObj.toISOString(),
          principalDue: principal,
          interestDue: balance - principal,
          paymentAmount: balance,
          status: 'pending',
          paidAmount: 0,
          paidAt: null,
          lateFee: 0,
          remainingBalance: 0,
        });
      }
    }

    // Upsert component schedule
    const existing = await strapi.entityService.findMany('api::repayment-schedule.repayment-schedule', {
      filters: { loan: loanId },
      populate: ['Schedule'],
      limit: 1
    });

    if (existing.length) {
      return strapi.entityService.update(
        'api::repayment-schedule.repayment-schedule',
        existing[0].id,
        { data: { Schedule } }
      );
    } else {
      return strapi.entityService.create('api::repayment-schedule.repayment-schedule', {
        data: { loan: loanId, Schedule },
      });
    }
  } catch (err) {
    console.error('createScheduleCriteria2 error:', err);
    return [];
  }
}

/**
 * Retrieve the repayment schedule for a given loan (Criteria2)
 */
async function getScheduleCriteria2(loanId) {
  try {
    const result = await strapi.db.query('api::repayment-schedule.repayment-schedule').findMany({
      where: { loan: loanId },
      populate: ['Schedule'],
      limit: 1,
    });
    return result.length ? result[0].Schedule : [];
  } catch (err) {
    console.error('getScheduleCriteria2 error:', err);
    return [];
  }
}


/**
 * Generate a repayment schedule using the "Criteria3" logic:
 * - Total interest is calculated for the whole term and split equally across all months.
 * - Each month, the user pays a fixed interest amount (e.g., 9000).
 * - The remaining balance is reduced by the payment amount each month.
 * - In the last month, the user pays the remaining principal plus the last interest installment.
 * This matches the example: 50000 loan, 18% for 3 months, 9000 per month interest, last payment is 59000 (50000 principal + 9000 interest).
 */
// async function createScheduleCriteria3(loanId) {
//   try {
//     const loan = await strapi.db.query('api::loan.loan').findOne({
//       where: { id: loanId },
//       populate: ['loanType', 'client'],
//     });
//     if (!loan) throw new Error('Loan not found');

//     const { disbursementDate, loanAmount: principal, loanTerm: termMonths, loanType } = loan;

//     // Get loan info constants
//     const loanInfo = await strapi.db.query('api::loans-information.loans-information').findOne();
//     const annualRatePercent = loanType.typeName === 'salaryBased'
//       ? loanInfo.defaultSalaryLoanInterestRate * 12
//       : loanInfo.defaultCollaterallLoanInterestRate * 12;

//     // Calculate total interest for the term (simple interest)
//     const totalInterest = +(principal * (annualRatePercent / 100) * (termMonths / 12)).toFixed(2);
//     const totalPayment = +(principal + totalInterest).toFixed(2);

//     // Determine fixed interest payment per month (rounded to 2 decimals)
//     const interestPerMonth = +(totalInterest / termMonths).toFixed(2);

//     // Build schedule array
//     const Schedule = [];
//     let balance = totalPayment;

//     for (let i = 1; i <= termMonths; i++) {
//       const dueDateObj = new Date(disbursementDate || Date.now());
//       dueDateObj.setMonth(dueDateObj.getMonth() + i);

//       if (i < termMonths) {
//         // For months 1 to (n-1): pay only interest, reduce balance by interest payment
//         balance = +(balance - interestPerMonth).toFixed(2);
//         Schedule.push({
//           dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
//           dueDate: dueDateObj.toISOString(),
//           principalDue: 0,
//           interestDue: interestPerMonth,
//           paymentAmount: interestPerMonth,
//           status: 'pending',
//           paidAmount: 0,
//           paidAt: null,
//           lateFee: 0,
//           remainingBalance: balance,
//         });
//       } else {
//         // Last month: pay all principal + last interest
//         Schedule.push({
//           dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
//           dueDate: dueDateObj.toISOString(),
//           principalDue: principal,
//           interestDue: interestPerMonth,
//           paymentAmount: +(principal + interestPerMonth).toFixed(2),
//           status: 'pending',
//           paidAmount: 0,
//           paidAt: null,
//           lateFee: 0,
//           remainingBalance: 0,
//         });
//       }
//     }

//     // Upsert component schedule
//     const existing = await strapi.entityService.findMany('api::repayment-schedule.repayment-schedule', {
//       filters: { loan: loanId },
//       populate: ['Schedule'],
//       limit: 1
//     });

//     if (existing.length) {
//       return strapi.entityService.update(
//         'api::repayment-schedule.repayment-schedule',
//         existing[0].id,
//         { data: { Schedule } }
//       );
//     } else {
//       return strapi.entityService.create('api::repayment-schedule.repayment-schedule', {
//         data: { loan: loanId, Schedule },
//       });
//     }
//   } catch (err) {
//     console.error('createScheduleCriteria3 error:', err);
//     return [];
//   }
// }

async function createScheduleCriteria3(loanId) {
  try {
    const loan = await strapi.db.query('api::loan.loan').findOne({
      where: { id: loanId },
      populate: ['loanType', 'client'],
    });
    if (!loan) throw new Error('Loan not found');

    const { disbursementDate, loanAmount: principal, loanTerm: termMonths, loanType } = loan;

    // Get loan info constants
    const loanInfo = await strapi.db.query('api::loans-information.loans-information').findOne();
    const annualRatePercent = loanType.typeName === 'salaryBased'
      ? loanInfo.defaultSalaryLoanInterestRate * 12
      : loanInfo.defaultCollaterallLoanInterestRate * 12;

    // Calculate total interest for the term (simple interest)
    const totalInterest = +(principal * (annualRatePercent / 100) * (termMonths / 12)).toFixed(2);
    const totalPayment = +(principal + totalInterest).toFixed(2);

    // Determine fixed interest payment per month (rounded to 2 decimals)
    const interestPerMonth = +(totalInterest / termMonths).toFixed(2);

    // Build schedule array
    const Schedule = [];
    let balance = totalPayment;

    for (let i = 1; i <= termMonths; i++) {
      const dueDateObj = new Date(disbursementDate || Date.now());
      dueDateObj.setMonth(dueDateObj.getMonth() + i);

      if (i < termMonths) {
        // For months 1 to (n-1): pay only interest, reduce balance by payment
        balance = +(balance - interestPerMonth).toFixed(2);
        Schedule.push({
          dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
          dueDate: dueDateObj.toISOString(),
          paymentAmount: interestPerMonth,
          principalDue: 0,
          interestDue: interestPerMonth,
          remainingBalance: balance,
          status: 'pending',
          paidAmount: 0,
          paidAt: null,
          lateFee: 0,
        });
      } else {
        // Last month: pay all principal + last interest, balance becomes 0
        Schedule.push({
          dueDateInWords: format(dueDateObj, 'do MMMM yyyy'),
          dueDate: dueDateObj.toISOString(),
          paymentAmount: +(principal + interestPerMonth).toFixed(2),
          principalDue: principal,
          interestDue: interestPerMonth,
          remainingBalance: 0,
          status: 'pending',
          paidAmount: 0,
          paidAt: null,
          lateFee: 0,
        });
      }
    }

    // Upsert component schedule
    const existing = await strapi.entityService.findMany('api::repayment-schedule.repayment-schedule', {
      filters: { loan: loanId },
      populate: ['Schedule'],
      limit: 1
    });

    if (existing.length) {
      return strapi.entityService.update(
        'api::repayment-schedule.repayment-schedule',
        existing[0].id,
        { data: { Schedule } }
      );
    } else {
      return strapi.entityService.create('api::repayment-schedule.repayment-schedule', {
        data: { loan: loanId, Schedule },
      });
    }
  } catch (err) {
    console.error('createScheduleCriteria3 error:', err);
    return [];
  }
}

/**
 * Retrieve the repayment schedule for a given loan (Criteria3)
 */
async function getScheduleCriteria3(loanId) {
  try {
    const result = await strapi.db.query('api::repayment-schedule.repayment-schedule').findMany({
      where: { loan: loanId },
      populate: ['Schedule'],
      limit: 1,
    });
    return result.length ? result[0].Schedule : [];
  } catch (err) {
    console.error('getScheduleCriteria3 error:', err);
    return [];
  }
}



module.exports = {
  createSchedule,
  getSchedule,
  recordPayment,
  createScheduleCriteria2,
  getScheduleCriteria2,
  createScheduleCriteria3,
  getScheduleCriteria3
}

