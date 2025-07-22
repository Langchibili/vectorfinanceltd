// path: src/api/get-repayment-schedule/controllers/get-repayment-schedule.js
'use strict'

const { createCoreController } = require('@strapi/strapi').factories
const { getSchedule } = require('../../../services/repaymentSchedule')

module.exports = createCoreController(
  'api::get-repayment-schedule.get-repayment-schedule',
  ({ strapi }) => ({
    /**
     * Custom find: if loanId query param provided, return its schedule
     */
    async find(ctx) {
      const { loanId } = ctx.query
      if (loanId) {
        // fetch and return repayment schedule array
        const schedule = await getSchedule(Number(loanId))
        return this.transformResponse({ data: schedule })
      }
      // fallback to default behaviour
      return super.find(ctx)
    },
  })
)