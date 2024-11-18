// const axios = require('axios');
// const nodemailer = require('nodemailer');

// module.exports = {
//     async afterUpdate(event) {
//         const { result, params } = event; // get the required objects
//          const {data} = params
//          const getLoan = async()=>{
//             return await strapi.db.query("api::loan.loan").findOne({where: {
//                 id: params.data.id
//             },
//                 populate: ['loanType']
//             })
//          }
//          const setLoanRepaymentAmount = async (loanBefore,loanAfter)=>{
//             console.log(loanBefore)
//             console.log(loanAfter)
//             const simpleInterestLoanCalculator = (loanAmount, annualInterestRate, loanTermMonths) => {
//                 const calculateTotalInterest = (amount, annualInterest, months) => {
//                   const years = months / 12;
//                   return (parseFloat(amount) * annualInterest * years) / 100;
//                 };
              
//                 const calculateTotalPayment = (loanAmount, totalInterest) => {
//                   return parseFloat(loanAmount) + parseFloat(totalInterest);
//                 };
              
//                 const totalInterest = calculateTotalInterest(loanAmount, annualInterestRate, loanTermMonths);
//                 const totalPayment = calculateTotalPayment(loanAmount, totalInterest);
//                 const monthlyPayment = totalPayment / loanTermMonths;
              
//                 return {
//                   totalInterest: parseFloat(totalInterest).toFixed(2),
//                   totalPayment: parseFloat(totalPayment).toFixed(2),
//                   monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
//                 };
//             };
              
              
//              const loanAmortizationCalculator = (loanAmount, annualInterestRate, loanTerm) => {
//                 const calculateMonthlyPayment = (amount, annualInterest, months) => {
//                   const monthlyInterest = annualInterest / 100 / 12;
//                   return (
//                     (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
//                     (Math.pow(1 + monthlyInterest, months) - 1)
//                   );
//                 };
              
//                 const calculateTotalPayment = (monthlyPayment, months) => {
//                   return monthlyPayment * months;
//                 };
              
//                 const calculateProfit = (totalPayment, loanAmount) => {
//                   return totalPayment - loanAmount;
//                 };
              
//                 const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTerm);
//                 const totalPayment = calculateTotalPayment(monthlyPayment, loanTerm);
//                 const totalProfit = calculateProfit(totalPayment, loanAmount);
               
//                 return {
//                   monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
//                   totalProfit: parseFloat(totalProfit).toFixed(2),
//                   totalPayment: parseFloat(totalPayment).toFixed(2)
//                 };
//             }

//             const calculateDueDate = (updatedAt,loanTerm)=>{
//                 return updatedAt
//             }

//              const loan = await getLoan()
//              if(loanBefore.loanStatus === "approved" || loanBefore.loanStatus === "disbursed"){
//                 let repaymentAmount = null
//                 if(!loan.loanType){
//                     return
//                 }
//                 if(loan.loanType.typeName === "salaryBased"){
//                     const {totalPayment} = loanAmortizationCalculator(loanBefore.loanAmount, loanBefore.interestRate, loanBefore.loanTerm)
//                     repaymentAmount = totalPayment
//                 }
//                 else{
//                     const {totalPayment} = simpleInterestLoanCalculator(loanBefore.loanAmount, loanBefore.interestRate, loanBefore.loanTerm)
//                     repaymentAmount = totalPayment
//                 }
//                 if(loanBefore.loanStatus === "approved"){
//                     const updateLoanAmountObject = {
//                           outstandingAmount: parseFloat(repaymentAmount),
//                           repaymentAmount: parseFloat(repaymentAmount)
//                     }
//                     const updatedLoan = await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data:updateLoanAmountObject });
//                     console.log(updatedLoan)
//                     return
//                     if(updatedLoan) {
//                         const updateDueDateObject = {
//                             approvalDate: updatedLoan.updatedAt,
//                             dueDate: calculateDueDate(updatedLoan.updatedAt,loanBefore.loanTerm)
//                         }
//                         await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data:updateDueDateObject });
//                     }
//                 }
//                 else{
//                     const updateLoanAmountObject = {
//                         outstandingAmount: parseFloat(repaymentAmount),
//                         repaymentAmount: parseFloat(repaymentAmount),
//                         disbursedAmount: parseFloat(repaymentAmount)
//                     }
//                     const updatedLoan = await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data:updateLoanAmountObject });
//                     console.log(updatedLoan)
//                     return
//                     if(updatedLoan) {
//                         const updateDueDateObject = {
//                             approvalDate: updatedLoan.updatedAt,
//                             dueDate: calculateDueDate(updatedLoan.updatedAt,loanBefore.loanTerm),
//                             disbursementDate: loanBefore.updatedAt
//                         }
//                         await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data:updateDueDateObject });
//                     }
//                }
//             }
//          }
//          setLoanRepaymentAmount(data,result)
//          }
         
//         },
//   };


'use strict';

const axios = require('axios');
const nodemailer = require('nodemailer');

module.exports = {
    async afterUpdate(event) {
        const { result, params } = event;
        const { data } = params;
        
        if(!params.data.id){
            return
        }
        const getLoan = async () => {
            return await strapi.db.query("api::loan.loan").findOne({
                where: { id: params.data.id },
                populate: ['loanType']
            });
        };

        const setLoanRepaymentAmount = async (loanBefore, loanAfter) => {
            if(!loanBefore){
                return
            }
            if(parseInt(loanBefore.outstandingAmount) > 1){ // it means you already approved the loan
                return
            }
          const simpleInterestLoanCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
                const calculateTotalInterest = (amount, monthlyInterest, months) => {
                  return (parseFloat(amount) * monthlyInterest * months) / 100;
                };
              
                const calculateTotalPayment = (loanAmount, totalInterest) => {
                  return parseFloat(loanAmount) + parseFloat(totalInterest);
                };
              
                const totalInterest = calculateTotalInterest(loanAmount, monthlyInterestRate, loanTermMonths);
                const totalPayment = calculateTotalPayment(loanAmount, totalInterest);
                const monthlyPayment = totalPayment / loanTermMonths;
              
                return {
                  totalInterest: parseFloat(totalInterest).toFixed(2),
                  totalPayment: parseFloat(totalPayment).toFixed(2),
                  monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
                };
              };
              
              
              
             const loanAmortizationCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
                const calculateMonthlyPayment = (amount, monthlyInterest, months) => {
                  return (
                    (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
                    (Math.pow(1 + monthlyInterest, months) - 1)
                  );
                };
              
                const calculateTotalPayment = (monthlyPayment, months) => {
                  return monthlyPayment * months;
                };
              
                const calculateProfit = (totalPayment, loanAmount) => {
                  return totalPayment - loanAmount;
                };
              
                const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyInterestRate / 100, loanTermMonths);
                const totalPayment = calculateTotalPayment(monthlyPayment, loanTermMonths);
                const totalProfit = calculateProfit(totalPayment, loanAmount);
              
                return {
                  monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
                  totalProfit: parseFloat(totalProfit).toFixed(2),
                  totalPayment: parseFloat(totalPayment).toFixed(2),
                };
              };

           
            const calculateDueDate = (date, loanTerm)=>{
                    // Parse the initial date
                    const startDate = new Date(date);
                    
                    // Add the loan term in months to the initial date
                    const dueDate = new Date(startDate);
                    dueDate.setMonth(startDate.getMonth() + loanTerm);
                    
                    // Format the date as 'YYYY-MM-DDTHH:mm:ss.sssZ'
                    const isoString = dueDate.toISOString();
                  
                    return isoString;
            }
                  
            const loan = await getLoan();
            if (loanBefore.loanStatus === "approved") {
                let repaymentAmount = null;
                if (!loan.loanType) return;

                if (loan.loanType.typeName === "salaryBased") {
                    const { totalPayment } = loanAmortizationCalculator(loanBefore.loanAmount, loanBefore.interestRate, loanBefore.loanTerm);
                    repaymentAmount = totalPayment;
                } else {
                    const { totalPayment } = simpleInterestLoanCalculator(loanBefore.loanAmount, loanBefore.interestRate, loanBefore.loanTerm);
                    repaymentAmount = totalPayment;
                }

                if(!loanBefore.id){
                    return
                }

                if (loanBefore.loanStatus === "approved") {
                    const updateLoanAmountObject = {
                        outstandingAmount: parseFloat(repaymentAmount),
                        repaymentAmount: parseFloat(repaymentAmount),
                        approvalDate: loanAfter.updatedAt,
                        disbursedAmount: parseFloat(loanBefore.loanAmount),
                        disbursementDate: loanAfter.updatedAt,
                        dueDate: calculateDueDate(loanAfter.updatedAt, loanBefore.loanTerm)
                    }
                    
                     await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: updateLoanAmountObject });
                } 
            }
        };

        await setLoanRepaymentAmount(data, result);
    },
};
