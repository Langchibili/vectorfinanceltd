/* This after update lifecycle method is only for cash and bank payments which loan officers would usually manually input */
const { SendSmsNotification, SendEmailNotification } = require('../../../../services/messages');
const { recordPayment } = require('../../../../services/repaymentSchedule');

module.exports = {
  async afterUpdate(event) {
    const { result: repayment } = event;

    // Only proceed if the repayment status is 'Paid'
    if(!repayment.publishedAt){
        return;
    }
    if(!["cash","bank"].includes(repayment.paymentMethod)){
        return;
    }

    // Re-fetch repayment to populate loan and client
    const fullRepayment = await strapi.db.query('api::repayment.repayment').findOne({
      where: { id: repayment.id },
      populate: { loan: { populate: ['client'] } }
    }) 

    if (!fullRepayment || !fullRepayment.loan) {
      console.log(`Repayment or related loan not found for repayment ID ${repayment.id}`);
      return
    }
    console.log("fullRepayment",fullRepayment)
    const loan = fullRepayment.loan;
    const client = loan.client;
    const repaymentAmt = parseFloat(fullRepayment.repaymentAmount);
    const loanId = loan.id;

    // Calculate new outstanding amount
    const oldOutstanding = parseFloat(loan.outstandingAmount);
    const newOutstanding = (oldOutstanding - repaymentAmt).toFixed(2);
    const loanUpdateData = { outstandingAmount: newOutstanding }
    if(parseFloat(newOutstanding) <= 0){
        loanUpdateData.loanStatus = "completed"
    }
    // Update loan record
    await strapi.db.query('api::loan.loan').update({
      where: { id: loanId },
      data: loanUpdateData
    })
    
    // record payment to the loan's schedule
    recordPayment(loanId, repaymentAmt.toFixed(2), fullRepayment.paymentDate, repayment.id)
    // Create a transaction history entry
    await strapi.db.query('api::transaction-history.transaction-history').create({
      data: {
        transactionType: 'repayment',
        transactionDate: fullRepayment.paymentDate,
        amount: repaymentAmt.toFixed(2),
        description: `Payment to loan #${loanId}, amount: ${repaymentAmt.toFixed(2)}`,
        loan: { connect: [loanId] },
        publishedAt: new Date()
      }
    });
    
    // Send notifications to client
    if (client) {
      const msg = `Your payment of ${repaymentAmt.toFixed(2)} to loan #${loanId} has been received. Your new balance is ${newOutstanding}.`;
      if (client.username) {
        SendSmsNotification(client.username, msg);
      }
      if (client.email) {
        SendEmailNotification(client.email, msg);
      }
    }
  }
};
