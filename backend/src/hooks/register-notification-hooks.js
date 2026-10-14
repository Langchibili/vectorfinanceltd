'use strict';

const { notifyUsers, notifyAdmins, broadcastEvent } = require('../services/realtime');

const LOAN = 'api::loan.loan';
const FORM = 'api::form-fill-value.form-fill-value';

const STATUS_COPY = {
  'pending-approval': ['Loan under review', (id) => `Your loan #${id} is now being reviewed.`],
  approved: ['Loan approved', (id) => `Your loan #${id} has been approved.`],
  disbursed: ['Funds disbursed', (id) => `Funds for loan #${id} have been disbursed.`],
  rejected: ['Loan declined', (id) => `Your loan #${id} was declined. Open the app for details.`],
};

module.exports = ({ strapi }) => {
  const safely = (handler) => async (event) => {
    try {
      await handler(event);
    } catch (error) {
      strapi.log.error(`[notify-hook] ${error.message}`);
    }
  };

  strapi.db.lifecycles.subscribe({
    models: [LOAN, FORM, 'api::repayment.repayment', 'api::investment-deposit.investment-deposit', 'api::admin-notification.admin-notification'],

    beforeUpdate: safely(async (event) => {
      const id = event.params?.where?.id;
      if (!id) return;

      if (event.model.uid === LOAN) {
        const previous = await strapi.db.query(LOAN).findOne({
          where: { id },
          select: ['id', 'loanStatus'],
        });
        event.state.prevStatus = previous?.loanStatus;
      }

      if (event.model.uid === FORM && event.params?.data?.clientId != null) {
        const previous = await strapi.db.query(FORM).findOne({
          where: { id },
          select: ['id', 'clientId'],
        });
        event.state.notifyDocumentSigned = previous?.clientId == null;
      }
    }),

    afterCreate: safely(async (event) => {
      const { uid } = event.model;
      const { result } = event;

      if (uid === LOAN) {
        await notifyAdmins({
          title: 'New loan application',
          body: `A client has started loan #${result.id}.`,
          type: 'loan_created',
          data: { loanId: result.id, route: `/admin/loans/${result.id}` },
        });
        broadcastEvent({ toAdmins: true, event: 'loan:created', data: { loanId: result.id } });
      }

      if (uid === 'api::repayment.repayment') {
        const row = await strapi.db.query(uid).findOne({
          where: { id: result.id },
          populate: ['client', 'loan'],
        });
        if (row?.client) {
          await notifyUsers([row.client.id], {
            title: 'Payment received',
            body: `Your payment to loan #${row.loan?.id ?? ''} was received. Thank you.`,
            type: 'repayment_received',
            appKey: 'vectorfin',
            data: { loanId: row.loan?.id, route: '/' },
          });
        }
      }

      if (uid === 'api::investment-deposit.investment-deposit') {
        const row = await strapi.db.query(uid).findOne({
          where: { id: result.id },
          populate: ['client'],
        });
        if (row?.client) {
          await notifyUsers([row.client.id], {
            title: 'Investment payment received',
            body: 'Your investment payment has been received.',
            type: 'investment_deposit',
            appKey: 'vectorfin',
            data: { route: '/' },
          });
        }
      }

      if (uid === 'api::admin-notification.admin-notification') {
        const row = await strapi.db.query(uid).findOne({
          where: { id: result.id },
          populate: ['notification', 'loan', 'investment'],
        });
        await notifyAdmins({
          title: 'Vector Finance',
          body: row?.notification?.title || 'New activity',
          type: 'admin_notification',
          data: {
            loanId: row?.loan?.id,
            investmentId: row?.investment?.id,
            route: row?.loan ? `/admin/loans/${row.loan.id}` : '/admin',
          },
        });
      }
    }),

    afterUpdate: safely(async (event) => {
      const { uid } = event.model;
      const { result } = event;

      if (uid === FORM && event.state?.notifyDocumentSigned) {
        const row = await strapi.db.query(FORM).findOne({ where: { id: result.id } });
        const loanId = row?.loanId ?? result.loanId;
        const clientId = row?.clientId ?? result.clientId;
        const formName = row?.formName ?? result.formName ?? 'a document';

        await notifyAdmins({
          title: 'Document signed',
          body: `Client #${clientId} signed "${formName}" for loan #${loanId}.`,
          type: 'document_signed',
          data: { loanId, clientId, route: `/admin/loans/${loanId}` },
        });
        if (clientId) {
          await notifyUsers([clientId], {
            title: 'Document signed',
            body: `Your signed copy of "${formName}" is ready.`,
            type: 'document_signed_confirmation',
            appKey: 'vectorfin',
            data: { loanId, route: '/esigning' },
          });
        }
        broadcastEvent({
          toAdmins: true,
          userIds: clientId ? [clientId] : [],
          event: 'document:signed',
          data: { loanId, clientId },
        });
      }

      if (uid === LOAN) {
        const previousStatus = event.state?.prevStatus;
        const loan = await strapi.db.query(LOAN).findOne({
          where: { id: result.id },
          populate: ['client'],
        });
        if (!loan || previousStatus == null || loan.loanStatus === previousStatus) return;

        const copy = STATUS_COPY[loan.loanStatus];
        if (copy && loan.client) {
          await notifyUsers([loan.client.id], {
            title: copy[0],
            body: copy[1](loan.id),
            type: 'loan_status',
            appKey: 'vectorfin',
            data: { loanId: loan.id, status: loan.loanStatus, route: '/' },
          });
        }
        broadcastEvent({
          toAdmins: true,
          userIds: loan.client ? [loan.client.id] : [],
          event: 'loan:status',
          data: { loanId: loan.id, status: loan.loanStatus },
        });
      }
    }),
  });

  strapi.log.info('[notify-hook] notification lifecycles registered');
};
