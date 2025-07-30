// /**
//  * Simple interest calculator
//  * principal, ratePercent, termMonths can be strings or numbers; parsed as floats
//  */
// function simpleInterest({ principal, ratePercent, termMonths }) {
//   principal   = parseFloat(principal);
//   ratePercent = parseFloat(ratePercent);
//   termMonths  = parseFloat(termMonths);
//   console.log('principal,ratePercent,termMonths',principal,ratePercent,termMonths)
//   console.log('principal,ratePercent,termMonths',typeof principal,typeof ratePercent,typeof termMonths)

//   const totalInterest  = (principal * ratePercent * termMonths) / 100;
//   const totalPayment   = principal + totalInterest;
//   const monthlyPayment = totalPayment / termMonths;
//    console.log('totalPayment',totalPayment)

//   return {
//     totalInterest:  parseFloat(totalInterest.toFixed(2)),
//     totalPayment:   parseFloat(totalPayment.toFixed(2)),
//     monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
//   };
// }

// /**
//  * Compound interest (no amortization)
//  */
// function compoundInterest({ principal, ratePercent, termPeriods }) {
//   principal   = parseFloat(principal);
//   ratePercent = parseFloat(ratePercent);
//   termPeriods = parseFloat(termPeriods);

//   const r            = ratePercent / 100;
//   const totalPayment = principal * Math.pow(1 + r, termPeriods);
//   const totalInterest = totalPayment - principal;

//   return {
//     totalInterest: parseFloat(totalInterest.toFixed(2)),
//     totalPayment:  parseFloat(totalPayment.toFixed(2)),
//   };
// }

// /**
//  * Amortization schedule calculator
//  */
// function amortization({ principal, annualRatePercent, termMonths, periodsPerYear = 12 }) {
//   principal           = parseFloat(principal);
//   annualRatePercent   = parseFloat(annualRatePercent);
//   termMonths          = parseFloat(termMonths);
//   periodsPerYear      = parseFloat(periodsPerYear);

//   const r       = annualRatePercent / 100 / periodsPerYear;
//   const n       = termMonths;
//   const payment = (principal * r * Math.pow(1 + r, n)) /
//                   (Math.pow(1 + r, n) - 1);
//   const totalPayment  = payment * n;
//   const totalInterest = totalPayment - principal;

//   return {
//     monthlyPayment: parseFloat(payment.toFixed(2)),
//     totalInterest:  parseFloat(totalInterest.toFixed(2)),
//     totalPayment:   parseFloat(totalPayment.toFixed(2)),
//   };
// }

// /**
//  * Calculates the payment breakdown and referral earnings based on timing
//  */
// async function calculateLoanPayment({ disbursementDate, paymentDate, principal, paidAmount, loanType }) {
//   principal  = parseFloat(principal);
//   paidAmount = parseFloat(paidAmount);

//   const settings = await strapi.db.query("api::loans-information.loans-information").findOne();

//   const start            = new Date(disbursementDate);
//   const end              = new Date(paymentDate);
//   const loanDurationDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

//   const defaultCollateralRate = parseFloat(settings.defaultCollaterallLoanInterestRate || 0);
//   const isSalary              = loanType?.typeName === 'salaryBased';

//   let interestPercent = 0;
//   if (!isSalary) {
//     const w1 = parseFloat(settings.interestInOneWeek  || defaultCollateralRate);
//     const w2 = parseFloat(settings.interestInTwoWeeks || defaultCollateralRate);
//     const w3 = parseFloat(settings.interestInThreeWeeks || defaultCollateralRate);

//     if (loanDurationDays <= 7)      interestPercent = w1;
//     else if (loanDurationDays <= 14) interestPercent = w2;
//     else if (loanDurationDays <= 21) interestPercent = w3;
//     else {
//       interestPercent = (defaultCollateralRate / 100) * (loanDurationDays / 7) * 100;
//     }
//   } else {
//     const salaryRate = parseFloat(settings.defaultSalaryLoanInterestRate || 0);
//     interestPercent  = (salaryRate / 30) * loanDurationDays;
//   }

//   const interestDue  = parseFloat(((principal * interestPercent) / 100).toFixed(2));
//   const totalDue     = principal + interestDue;
//   const fullRepayment = paidAmount >= totalDue;

//   const defaultRefRate   = parseFloat(settings.referralPercentage || 0);
//   const referralRateType = settings.referralRateType || 'percentage';
//   let refRate            = defaultRefRate;

//   if (!isSalary) {
//     const r1 = parseFloat(settings.referralPercentInOneWeek  ?? defaultRefRate);
//     const r2 = parseFloat(settings.referralPercentInTwoWeeks ?? defaultRefRate);
//     const r3 = parseFloat(settings.referralPercentInThreeWeeks ?? defaultRefRate);
//     if (loanDurationDays <= 7)      refRate = r1;
//     else if (loanDurationDays <= 14) refRate = r2;
//     else if (loanDurationDays <= 21) refRate = r3;
//   }

//   const referralEarnings = referralRateType === 'flat'
//     ? refRate
//     : parseFloat(((totalDue * refRate) / 100).toFixed(2));

//   return {
//     loanDurationDays,
//     interestPercent:     parseFloat(interestPercent.toFixed(2)),
//     interestDue,
//     totalDue:            parseFloat(totalDue.toFixed(2)),
//     fullRepayment,
//     referralEarnings,
//     referralRateApplied: refRate,
//     referralRateType,
//   };
// }

// /**
//  * Main loan calculator using settings
//  */
// async function calculateLoan({ amount, loanType, termMonths = null }) {
//   amount = parseFloat(amount);
//   const settings = await strapi.db.query("api::loans-information.loans-information").findOne();

//   const isSalary    = loanType.typeName === 'salaryBased';
//   const defaultRate = parseFloat(isSalary
//     ? settings.defaultSalaryLoanInterestRate
//     : settings.defaultCollaterallLoanInterestRate || 0);
//   const defaultTerm = parseFloat(isSalary
//     ? settings.defaultSalaryLoanTerm
//     : settings.defaultCollaterallLoanTerm || 0);
//   const term        = parseFloat(termMonths ?? defaultTerm);

//   const interestType = isSalary
//     ? settings.salaryLoanInterestType      || 'compound'
//     : settings.collateralLoanInterestType  || 'simple';
//   const interestCalc = isSalary
//     ? settings.salaryLoanInterestCalculation || 'monthly'
//     : settings.collateralLoanInterestCalculation || 'monthly';

//   if (interestType === 'simple') {
//     const ratePerPeriod = interestCalc === 'monthly'
//       ? defaultRate
//       : defaultRate / 12;
//     return simpleInterest({ principal: amount, ratePercent: ratePerPeriod, termMonths: term });
//   }

//   if (interestType === 'amortization') {
//     const annualRate = interestCalc === 'annually'
//       ? defaultRate
//       : defaultRate * 12;
//     return amortization({ principal: amount, annualRatePercent: annualRate, termMonths: term });
//   }

//   const ratePerPeriod = interestCalc === 'monthly'
//     ? defaultRate
//     : defaultRate / 12;
//   return compoundInterest({ principal: amount, ratePercent: ratePerPeriod, termPeriods: term });
// }

// module.exports = {
//   simpleInterest,
//   compoundInterest,
//   amortization,
//   calculateLoanPayment,
//   calculateLoan,
// };




function simpleInterest({ principal, ratePercent, termMonths }) {
  // 1) force everything to float
  principal   = parseFloat(principal);
  ratePercent = parseFloat(ratePercent);
  termMonths  = parseFloat(termMonths);

  // 2) do the arithmetic
  const totalInterest  = (principal * ratePercent * termMonths) / 100;
  const totalPayment   = principal + totalInterest;
  const monthlyPayment = totalPayment / termMonths;

  // 3) round *once* at the very end
  return {
    totalInterest:  parseFloat(totalInterest.toFixed(2)),
    totalPayment:   parseFloat(totalPayment.toFixed(2)),
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
  };
}


/**
 * Pure compound interest (no amortization)
 */
function compoundInterest({ principal, ratePercent, termPeriods }) {
  const r = ratePercent / 100
  const n = termPeriods
  const totalPayment = principal * Math.pow(1 + r, n)
  const totalInterest = totalPayment - principal

  return {
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
  }
}

/**
 * Amortization schedule calculator
 */
function amortization({ principal, annualRatePercent, termMonths, periodsPerYear = 12 }) {
  const r = annualRatePercent / 100 / periodsPerYear
  const n = termMonths
  const payment =
    (principal * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1)
  const totalPayment = payment * n
  const totalInterest = totalPayment - principal

  return {
    monthlyPayment: parseFloat(payment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
  }
}

/**
 * Calculates the interest, total due, and referral earnings based on payment timing
 */
async function calculateLoanPayment({ disbursementDate, paymentDate, principal, paidAmount, loanType }) {
  // fetch constants from loans-information single type
  const settings = await strapi.db.query("api::loans-information.loans-information").findOne()
  
  // determine loan duration in days
  const start = new Date(disbursementDate)
  const end = new Date(paymentDate)
  const loanDurationDays = Math.floor((end - start) / (1000 * 60 * 60 * 24))

  const defaultCollateralRate = settings.defaultCollaterallLoanInterestRate || 0
  const isSalary = loanType && loanType.typeName === 'salaryBased'

  // calculate interest percent
  let interestPercent = 0
  if (!isSalary) {
    const week1 = settings.interestInOneWeek
    const week2 = settings.interestInTwoWeeks
    const week3 = settings.interestInThreeWeeks
    if (loanDurationDays <= 7) {
      interestPercent = week1 || defaultCollateralRate
    } else if (loanDurationDays <= 14) {
      interestPercent = week2 || defaultCollateralRate
    } else if (loanDurationDays <= 21) {
      interestPercent = week3 || defaultCollateralRate
    } else {
      const monthlyRate = defaultCollateralRate / 100
      interestPercent = monthlyRate * (loanDurationDays / 7) * 100
    }
  } else {
    const salaryRate = settings.defaultSalaryLoanInterestRate || 0
    interestPercent = (salaryRate / 30) * loanDurationDays
  }

  // compute interest and total due
  const interestDue = parseFloat(((principal * interestPercent) / 100).toFixed(2))
  const totalDue = principal + interestDue
  const fullRepayment = paidAmount >= totalDue

  // calculate referral earnings
  const defaultReferralRate = settings.referralPercentage || 0
  const referralRateType = settings.referralRateType || 'percentage'
  let refRate = defaultReferralRate

  if (!isSalary) {
    const refWeek1 = settings.referralPercentInOneWeek
    const refWeek2 = settings.referralPercentInTwoWeeks
    const refWeek3 = settings.referralPercentInThreeWeeks
    if (loanDurationDays <= 7) {
      refRate = refWeek1 != null ? refWeek1 : defaultReferralRate
    } else if (loanDurationDays <= 14) {
      refRate = refWeek2 != null ? refWeek2 : defaultReferralRate
    } else if (loanDurationDays <= 21) {
      refRate = refWeek3 != null ? refWeek3 : defaultReferralRate
    }
  }

  let referralEarnings = 0
  if (referralRateType === 'flat') {
    referralEarnings = refRate
  } else {
    referralEarnings = parseFloat(((totalDue * refRate) / 100).toFixed(2))
  }

  return {
    loanDurationDays,
    interestPercent: parseFloat(interestPercent.toFixed(2)),
    interestDue,
    totalDue: parseFloat(totalDue.toFixed(2)),
    fullRepayment,
    referralEarnings,
    referralRateApplied: refRate,
    referralRateType,
  }
}

/**
 * Main loan calculator using settings
 */
async function calculateLoan({ amount, loanType, termMonths = null }) {
  const settings = await strapi.db.query("api::loans-information.loans-information").findOne()

  const isSalary = loanType.typeName === 'salaryBased'
  const defaultRate = isSalary
    ? settings.defaultSalaryLoanInterestRate
    : settings.defaultCollaterallLoanInterestRate
  const defaultTerm = isSalary
    ? settings.defaultSalaryLoanTerm
    : settings.defaultCollaterallLoanTerm
  const term = termMonths || defaultTerm

  const interestType = isSalary
    ? settings.salaryLoanInterestType || 'compound'
    : settings.collateralLoanInterestType || 'simple'
  const interestCalc = isSalary
    ? settings.SalaryLoanInterestCalculation || 'monthly'
    : settings.collateralLoanInterestCalculation || 'monthly'

  if (interestType === 'simple') {
    const ratePerPeriod = interestCalc === 'monthly' ? defaultRate : defaultRate / 12
    return simpleInterest({ principal: amount, ratePercent: ratePerPeriod, termMonths: term })
  }

  if (interestType === 'amortization') {
    const annualRate = interestCalc === 'annually' ? defaultRate : defaultRate * 12
    return amortization({ principal: amount, annualRatePercent: annualRate, termMonths: term })
  }

  const ratePerPeriod = interestCalc === 'monthly' ? defaultRate : defaultRate / 12
  return compoundInterest({ principal: amount, ratePercent: ratePerPeriod, termPeriods: term })
}

module.exports = {
  simpleInterest,
  compoundInterest,
  amortization,
  calculateLoanPayment,
  calculateLoan,
}



// old logic
/// every quadrant of a week, it's 5%, though 18% if 
// on payment of interest, the referrer earns a percentage 
// const simpleInterestLoanCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
//   const calculateTotalInterest = (amount, monthlyInterest, months) => {
//     return (parseFloat(amount) * monthlyInterest * months) / 100;
//   }

//   const calculateTotalPayment = (loanAmount, totalInterest) => {
//     return parseFloat(loanAmount) + parseFloat(totalInterest);
//   }

//   const totalInterest = calculateTotalInterest(loanAmount, monthlyInterestRate, loanTermMonths);
//   const totalPayment = calculateTotalPayment(loanAmount, totalInterest);
//   const monthlyPayment = totalPayment / loanTermMonths;

//   return {
//     totalInterest: parseFloat(totalInterest).toFixed(2),
//     totalPayment: parseFloat(totalPayment).toFixed(2),
//     monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
//   };
// };



// const loanAmortizationCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
//   const calculateMonthlyPayment = (amount, monthlyInterest, months) => {
//     return (
//       (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
//       (Math.pow(1 + monthlyInterest, months) - 1)
//     );
//   };

//   const calculateTotalPayment = (monthlyPayment, months) => {
//     return monthlyPayment * months;
//   };

//   const calculateProfit = (totalPayment, loanAmount) => {
//     return totalPayment - loanAmount;
//   };

//   const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyInterestRate / 100, loanTermMonths);
//   const totalPayment = calculateTotalPayment(monthlyPayment, loanTermMonths);
//   const totalProfit = calculateProfit(totalPayment, loanAmount);

//   return {
//     monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
//     totalProfit: parseFloat(totalProfit).toFixed(2),
//     totalPayment: parseFloat(totalPayment).toFixed(2),
//   };
// };
      
