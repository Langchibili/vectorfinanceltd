const getAdminUserEmailsAndNumbers = async () => {
  const admin = await strapi.db.query("api::admin.admin").findOne({
    populate: ['loanApprovers', 'loanDisbursers', 'loanAdministrators', 'adminNotificationsAccount']
  })

  return {
    loanApproverEmails: admin.loanApprovers.map(u => u.email).filter(Boolean),
    loanDisburserEmails: admin.loanDisbursers.map(u => u.email).filter(Boolean),
    loanAdministratorEmails: admin.loanAdministrators.map(u => u.email).filter(Boolean),
    adminNotificationsEmails: admin.adminNotificationsAccount.map(u => u.email).filter(Boolean),

    loanApproverNumbers: admin.loanApprovers.map(u => u.username).filter(Boolean),
    loanDisburserNumbers: admin.loanDisbursers.map(u => u.username).filter(Boolean),
    loanAdministratorNumbers: admin.loanAdministrators.map(u => u.username).filter(Boolean),
    adminNotificationsNumbers: admin.adminNotificationsAccount.map(u => u.username).filter(Boolean)
  }
} 
module.exports = { getAdminUserEmailsAndNumbers }