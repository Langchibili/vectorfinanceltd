// // // // // path: src/api/repayment-schedule/content-types/repayment-schedule/lifecycles.js

// // // // const { SendEmailNotification } = require('../../../../services/messages')
// // // // const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers')

// // // // module.exports = {
// // // //   async beforeUpdate(event) {
// // // //       const { params } = event
// // // //       const scheduleId = params.where.id
// // // //       const incoming = params.data || {}
// // // //       // Only intercept if Schedule component is being updated
// // // //       if (incoming.Schedule) {
// // // //         // Load existing schedule with its items
// // // //         const existing = (await strapi.db.query(
// // // //           'api::repayment-schedule.repayment-schedule'
// // // //         ).findOne({
// // // //           where: { id: scheduleId },
// // // //           populate: ['Schedule'],
// // // //         })) || { Schedule: [] }

// // // //         // Merge incoming and existing:
// // // //         // — If an item was non-pending before, lock its structural fields
// // // //         // — But allow paidAmount, paidAt, and status to change
// // // //         const merged = incoming.Schedule.map(item => {
// // // //           const original = existing.Schedule.find(e => e.dueDate === item.dueDate)
// // // //           if (original && original.status !== 'pending') {
// // // //             return {
// // // //               // keep original structural fields
// // // //               ...original,
// // // //               // but merge payment updates from incoming
// // // //               paidAmount:  item.paidAmount  != null ? item.paidAmount  : original.paidAmount,
// // // //               paidAt:      item.paidAt      != null ? item.paidAt      : original.paidAt,
// // // //               status:      item.status      != null ? item.status      : original.status,
// // // //             }
// // // //           }
// // // //           // otherwise accept the incoming item wholesale
// // // //           return item
// // // //         })
// // // //         // Replace the update payload with our merged array
// // // //         params.data.Schedule = merged

// // // //         // If any locked item was altered structurally (shouldn't happen),
// // // //         // notify admins and abort
// // // //         // const tampered = merged.find((m, idx) => {
// // // //         //   const orig = existing.Schedule[idx]
// // // //         //   return orig && orig.status !== 'pending' &&
// // // //         //     (m.dueDate      !== orig.dueDate ||
// // // //         //      m.dueDateInWords !== orig.dueDateInWords ||
// // // //         //      m.principalDue !== orig.principalDue ||
// // // //         //      m.interestDue  !== orig.interestDue)
// // // //         // })
// // // //         // if (tampered) {
// // // //         //   const msg = 'Please note Cannot change schedule dates or amounts once repayment has begun.'
// // // //         //   const { adminNotificationsEmails } = await getAdminUserEmailsAndNumbers()
// // // //         //   await SendEmailNotification(adminNotificationsEmails, msg)
// // // //         //   throw new Error(msg)
// // // //         // }
// // // //       }
// // // //     }
// // // // }

// // // // path: src/api/repayment-schedule/content-types/repayment-schedule/lifecycles.js

// // // const { SendEmailNotification } = require('../../../../services/messages')
// // // const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers')

// // // module.exports = {
// // //  async beforeUpdate(event) {
// // //       const { params } = event
// // //       const scheduleId = params.where.id
// // //       const incoming = params.data || {}

// // //       if (incoming.Schedule) {
// // //         // Load existing schedule items via db.query
// // //         const existingRes = await strapi.db.query(
// // //           'api::repayment-schedule.repayment-schedule'
// // //         ).findOne({
// // //           where: { id: scheduleId },
// // //           populate: ['Schedule'],
// // //         })
// // //         const existing = existingRes || { Schedule: [] }

// // //         // Merge array: lock structure for non-pending, preserve id/pivot
// // //         const merged = incoming.Schedule.map(item => {
// // //           // match by id or by dueDate
// // //           const match = existing.Schedule.find(e => (item.id && e.id === item.id) || e.dueDate === item.dueDate)
// // //           if (match && match.status !== 'pending') {
// // //             return {
// // //               id: match.id,
// // //               __pivot: match.__pivot,
// // //               dueDateInWords: match.dueDateInWords,
// // //               dueDate: match.dueDate,
// // //               principalDue: match.principalDue,
// // //               interestDue: match.interestDue,
// // //               lateFee: match.lateFee,
// // //               // allow payment fields to update
// // //               paidAmount: item.paidAmount != null ? item.paidAmount : match.paidAmount,
// // //               paidAt:     item.paidAt     != null ? item.paidAt     : match.paidAt,
// // //               status:     item.status     != null ? item.status     : match.status,
// // //             }
// // //           }
// // //           // preserve id/pivot for new items too
// // //           return {
// // //             id: item.id,
// // //             __pivot: item.__pivot,
// // //             ...item,
// // //           }
// // //         })

// // //         // Replace payload
// // //         params.data.Schedule = merged
// // //       }
// // //     }
// // // }

// // // path: src/api/repayment-schedule/content-types/repayment-schedule/lifecycles.js

// // const { SendEmailNotification } = require('../../../../services/messages')
// // const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers')

// // module.exports = async function beforeUpdate(event) {
// //   const { params } = event
// //   const scheduleId = params.where.id
// //   const incoming = params.data || {}

// //   if (incoming.Schedule) {
// //     // Load existing schedule items via db.query
// //     const existingRes = await strapi.db.query(
// //       'api::repayment-schedule.repayment-schedule'
// //     ).findOne({
// //       where: { id: scheduleId },
// //       populate: ['Schedule'],
// //     })
// //     const existing = existingRes || { Schedule: [] }

// //     // Build map of incoming updates by id or dueDate
// //     const incomingMap = new Map(
// //       incoming.Schedule.map(item => [item.id || item.dueDate, item])
// //     )

// //     // Merge existing items: update payment fields if present, preserve structure
// //     const merged = existing.Schedule.map(orig => {
// //       const key = orig.id || orig.dueDate
// //       const upd = incomingMap.get(key)
// //       if (orig.status !== 'pending') {
        
// //         // structural fields locked; merge payment-only
// //         return {
// //           ...orig,
// //           paidAmount: upd?.paidAmount ?? orig.paidAmount,
// //           paidAt:     upd?.paidAt     ?? orig.paidAt,
// //           status:     upd?.status     ?? orig.status,
// //         }
// //       }
// //       // for pending, use incoming if provided, else keep original
// //       return upd ? { ...orig, ...upd } : orig
// //     })

// //     // Append any new incoming items (no id)
// //     incoming.Schedule.forEach(item => {
// //       if (!item.id) merged.push(item)
// //     })

// //     // Replace the update payload
// //     params.data.Schedule = merged
// //   }
// // }
// // path: src/api/repayment-schedule/content-types/repayment-schedule/lifecycles.js

// const { SendEmailNotification } = require('../../../../services/messages')
// const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers')

// module.exports = {
//   async beforeUpdate(event) {
//       const { params } = event
//       const scheduleId = params.where.id
//       const incoming = params.data || {}

//       if (incoming.Schedule) {
//         // Load existing schedule items via db.query
//         const existingRes = await strapi.db.query(
//           'api::repayment-schedule.repayment-schedule'
//         ).findOne({
//           where: { id: scheduleId },
//           populate: ['Schedule'],
//         })
//         const existing = existingRes || { Schedule: [] }

//         // Build map of incoming updates by id or dueDate
//         const incomingMap = new Map(
//           incoming.Schedule.map(item => [item.id || item.dueDate, item])
//         )

//         // Merge existing items: update payment fields if present, preserve structure
//         const merged = existing.Schedule.map(orig => {
//           const key = orig.id || orig.dueDate
//           const upd = incomingMap.get(key)
//           if (orig.status !== 'pending') {
//             // structural fields locked; merge payment-only
//             return {
//               ...orig,
//               paidAmount: upd?.paidAmount ?? orig.paidAmount,
//               paidAt:     upd?.paidAt     ?? orig.paidAt,
//               status:     upd?.status     ?? orig.status,
//             }
//           }
//           // for pending, use incoming if provided, else keep original
//           return upd ? { ...orig, ...upd } : orig
//         })

//         // Append any new incoming items (no id)
//         incoming.Schedule.forEach(item => {
//           if (!item.id) merged.push(item)
//         })

//         // Replace the update payload
//         params.data.Schedule = merged
//       }
//     }
// }
