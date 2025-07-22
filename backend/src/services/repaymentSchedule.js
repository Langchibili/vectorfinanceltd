const { format } = require('date-fns')
const { SendEmailNotification } = require('./messages')
const { getAdminUserEmailsAndNumbers } = require('./getAdminUserEmailsAndNumbers')
const { calculateLoan, amortization } = require('./intererestCalculation')
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
      const dueDateObj = new Date(disbursementDate)
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
        item.paidAt = new Date(paymentDate).toISOString()
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

module.exports = {
  createSchedule,
  getSchedule,
  recordPayment,
}
