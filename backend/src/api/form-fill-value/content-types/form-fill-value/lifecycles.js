// 'use strict'

// // Dependencies to install:
// // npm install handlebars puppeteer

// const fs = require('fs/promises')
// const os = require('os')
// const path = require('path')
// const Handlebars = require('handlebars')
// const puppeteer = require('puppeteer')
// const { getSchedule } = require('../../../../services/repaymentSchedule')

// module.exports = {
//   async afterUpdate(event) {
//     const { result } = event
//     console.log('[Debug] afterUpdate for FormFillValues ID:', result.id)

//     let tmpFilePath = null

//     try {
//       // 1. Validate IDs
//       const clientId = Number(result.clientId)
//       const loanId = Number(result.loanId)
//       const appFormId = Number(result.applicationFormId)
//       console.log('[Debug] clientId, applicationFormId:', result.clientId, result.applicationFormId)
//       if (isNaN(clientId) || isNaN(appFormId)) {
//         throw new Error(`Invalid IDs – clientId: ${result.clientId}, applicationFormId: ${result.applicationFormId}`)
//       }

//       // 2. Load & compile template
//       const templatePath = path.resolve(
//         __dirname,
//         '../../../../../public/formTemplates',
//         `${result.formName}.html`
//       )
//       const raw = await fs.readFile(templatePath, 'utf-8')
//       /**
//   //  * Simple equality test: {{#if (eq a b)}}…{{/if}}
//   //  */
//   // Handlebars.registerHelper('eq', (a, b) => a === b)

//   // /**
//   //  * Boolean OR: {{#if (or a b)}}…{{/if}}
//   //  * You can even pass more than two args: (or a b c)
//   //  */
//   // Handlebars.registerHelper('or', function(...args) {
//   //   // last argument is the Handlebars options object
//   //   args.pop()
//   //   return args.some(Boolean)
//   // })
//       const template = Handlebars.compile(raw)

//       // 3. Fetch user + signatures
//       const user = await strapi
//         .query('plugin::users-permissions.user')
//         .findOne({
//           where: { id: clientId },
//           populate: ['signature', 'witnessSignature','initials','witnessInitials'],
//         })  
//       const adminSignatures = await strapi
//         .query('api::admin-signature.admin-signature')
//         .findOne({
//           where: { id: 1 },
//           populate: ['director','ceo'],
//         })

//       const adminInitials = await strapi
//         .query('api::admin-initial.admin-initial')
//         .findOne({
//           where: { id: 1 },
//           populate: ['director','ceo'],
//         })
      
//       // ─────────────────────────────────────────────────────────────
//       // 4️⃣ Convert signature media to inlined data URIs
//       // ─────────────────────────────────────────────────────────────
//       // Helper: read a public/uploaded file and return a data URI
//       async function fileToDataURI(file) {
//         if (!file || !file.url) return ''
//         // Strapi stores uploads under /public/uploads
//         const publicDir = path.resolve(process.cwd(), 'public')
//         const filePath  = path.join(publicDir, file.url)
//         const buffer    = await fs.readFile(filePath)
//         return `data:${file.mime};base64,${buffer.toString('base64')}`
//       }
      
//       // **Pinpoint insertion**: convert both signature fields here
//       const signatureDataURI = await fileToDataURI(user.signature)
//       const witnessSignatureDataURI = await fileToDataURI(user.witnessSignature)
//       const initialsDataURI  = await fileToDataURI(user.initials)
//       const witnessInitialsDataURI = await fileToDataURI(user.witnessInitials)
//       const directorSignatureDataURI = await fileToDataURI(adminSignatures.director)
//       const ceoSignatureDataURI = await fileToDataURI(adminSignatures.ceo)
//       const directorInitialsDataURI = await fileToDataURI(adminInitials.director)
//       const ceoInitialsDataURI = await fileToDataURI(adminInitials.ceo)
//       const schedule = await getSchedule(Number(loanId))
//       console.log('[Debug] signatureDataURI length:', signatureDataURI.length)
//       console.log('[Debug] witnessSignatureDataURI length:', witnessSignatureDataURI.length)

//       // ─────────────────────────────────────────────────────────────
//       // 5️⃣ Render HTML with inlined signatures
//       // ─────────────────────────────────────────────────────────────
//       const context = {
//         ...result.values,
//         lenderWitnessName: adminInitials.ceoFullNames,
//         directorName: adminInitials.directorFullNames,
//         signature: signatureDataURI,
//         witnessSignature: witnessSignatureDataURI,
//         initials: initialsDataURI,
//         witnessInitials: witnessInitialsDataURI,
//         directorSignature: directorSignatureDataURI,
//         ceoSignature: ceoSignatureDataURI,
//         directorInitials: directorInitialsDataURI,
//         ceoInitials: ceoInitialsDataURI,
//         isLand:   result.values.propertyName === 'Property Name: land' || result.values.propertyName === 'land',
//         isHouse:  result.values.propertyName === 'Property Name: house'  || result.values.propertyName === 'house',
//         isVehicle:result.values.propertyName === 'Property Name: vehicle'  || result.values.propertyName === 'vehicle'
//       }
//       const html = template(context)
//       console.log('[Debug] Generated HTML length:', html.length)


//       // 5. Generate PDF buffer
//       // const browser = await puppeteer.launch({ headless: true })
//       const browser = await puppeteer.launch({
//         headless: true,   // or false, as you need
//         args: [
//           "--no-sandbox",
//           "--disable-setuid-sandbox",
//           // (you can keep any other flags you already had)
//         ],
//       })
//       const page = await browser.newPage()
//       await page.setContent(html, { waitUntil: 'networkidle0' })
//       const pdfBuffer = await page.pdf({
//         format: 'A4',
//         margin: { top: '0.5in', bottom: '0.5in' },
//       })
//       await browser.close()

//       // 6. Write buffer to temp file
//       tmpFilePath = path.join(os.tmpdir(), `${result.formName}-${result.id}.pdf`)
//       await fs.writeFile(tmpFilePath, pdfBuffer)
//       console.log('[Debug] Temp PDF path:', tmpFilePath)

//       // 7a. Upload raw PDF to Media Library
//       const uploadService = strapi.plugin('upload').service('upload')
//       const [fileEntry] = await uploadService.upload({
//         data: {}, 
//         files: [{
//           path: tmpFilePath,
//           name: `${result.formName}_clientid_${result.clientId}_lid_${result.loanId}.pdf`,
//           type: 'application/pdf',
//           size: pdfBuffer.length,    // prevent NaN
//         }],
//       })
//       console.log('LoanSchedule', schedule)
//       console.log('[Debug] Media Library entry:', fileEntry.id, fileEntry.url)

//       // 7b. Fetch the specific applicationForms entry
//       const userFull = await strapi
//         .query('plugin::users-permissions.user')
//         .findOne({
//           where: { id: clientId },
//           populate: ['applicationForms']
//         })
//       const forms = userFull.applicationForms || []
//       const idx = forms.findIndex(f => f.id === appFormId)
//       console.log('[Debug] applicationFormId found at index:', idx)
//       if (idx === -1) {
//         throw new Error(`applicationFormId ${appFormId} not found`)
//       }

//       // 8. Push new file ID into signedForm array
//       const existing = Array.isArray(forms[idx].signedForm)
//         ? forms[idx].signedForm
//         : (forms[idx].signedForm ? [forms[idx].signedForm] : [])
//       existing.push(fileEntry.id)
//       forms[idx].signedForm = existing
//       console.log('[Debug] New signedForm array:', forms[idx].signedForm)
      
//       // 9. Persist updated applicationForms
//       await strapi.entityService.update(
//         'plugin::users-permissions.user',
//         clientId,
//         { data: { applicationForms: forms } }
//       )
//       console.log('[Debug] Persisted updated applicationForms for user', clientId)
//       // push the file into the loanAgreementDocuments aspect of the loan
//       await strapi.entityService.update('api::loan.loan', result.loanId, {
//       data: {
//         // if loanAgreementDocuments is a _multiple_ media field:
//         loanAgreementDocuments:[ fileEntry.id ]
//       }
//     })

//     } catch (err) {
//       console.error('[Error] afterUpdate failed:', err)
//       throw err
//     } finally {
//       // 10. Clean up temp file
//       if (tmpFilePath) {
//         try {
//           await fs.unlink(tmpFilePath)
//           console.log('[Debug] Deleted temp file:', tmpFilePath)
//         } catch (cleanupErr) {
//           console.warn('[Warning] Temp file cleanup failed:', cleanupErr)
//         }
//       }
//     }
//   },
// }


'use strict'

// Dependencies to install:
// npm install handlebars puppeteer

const fs = require('fs/promises')
const os = require('os')
const path = require('path')
const Handlebars = require('handlebars')
const puppeteer = require('puppeteer')
const { getSchedule } = require('../../../../services/repaymentSchedule')

module.exports = {
  async afterUpdate(event) {
    const { result } = event
    console.log('[Debug] afterUpdate for FormFillValues ID:', result.id)

    let tmpFilePath = null

    try {
      // 1. Validate IDs
      const clientId = Number(result.clientId)
      const loanId = Number(result.loanId)
      const appFormId = Number(result.applicationFormId)
      console.log('[Debug] clientId, applicationFormId:', result.clientId, result.applicationFormId)
      if (isNaN(clientId) || isNaN(appFormId)) {
        throw new Error(`Invalid IDs – clientId: ${result.clientId}, applicationFormId: ${result.applicationFormId}`)
      }

      // 2. Load & compile template
      const templatePath = path.resolve(
        __dirname,
        '../../../../../public/formTemplates',
        `${result.formName}.html`
      )
      const raw = await fs.readFile(templatePath, 'utf-8')

      // Register helpers used by the template (safe to re-register)
      Handlebars.registerHelper('formatCurrency', function (value) {
        if (value === undefined || value === null || isNaN(Number(value))) return ''
        return new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW', maximumFractionDigits: 2 }).format(Number(value))
      })

      const template = Handlebars.compile(raw)

      // 3. Fetch user + signatures
      const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({
          where: { id: clientId },
          populate: ['signature', 'witnessSignature','initials','witnessInitials'],
        })
      const adminSignatures = await strapi
        .query('api::admin-signature.admin-signature')
        .findOne({
          where: { id: 1 },
          populate: ['director','ceo'],
        })

      const adminInitials = await strapi
        .query('api::admin-initial.admin-initial')
        .findOne({
          where: { id: 1 },
          populate: ['director','ceo'],
        })

      // ─────────────────────────────────────────────────────────────
      // 4️⃣ Convert signature media to inlined data URIs
      // ─────────────────────────────────────────────────────────────
      // Helper: read a public/uploaded file and return a data URI
      async function fileToDataURI(file) {
        if (!file || !file.url) return ''
        // Strapi stores uploads under /public/uploads
        const publicDir = path.resolve(process.cwd(), 'public')
        const filePath  = path.join(publicDir, file.url)
        const buffer    = await fs.readFile(filePath)
        return `data:${file.mime};base64,${buffer.toString('base64')}`
      }

      // **Pinpoint insertion**: convert both signature fields here
      const signatureDataURI = await fileToDataURI(user.signature)
      const witnessSignatureDataURI = await fileToDataURI(user.witnessSignature)
      const initialsDataURI  = await fileToDataURI(user.initials)
      const witnessInitialsDataURI = await fileToDataURI(user.witnessInitials)
      const directorSignatureDataURI = await fileToDataURI(adminSignatures.director)
      const ceoSignatureDataURI = await fileToDataURI(adminSignatures.ceo)
      const directorInitialsDataURI = await fileToDataURI(adminInitials.director)
      const ceoInitialsDataURI = await fileToDataURI(adminInitials.ceo)

      // ─────────────────────────────────────────────────────────────
      // 4.5 Fetch repayment schedule and normalize it for the template
      //    — id should be incremental (1,2,3,...), not the DB id
      // ─────────────────────────────────────────────────────────────
      const rawSchedule = await getSchedule(Number(loanId)) || []
      // compute starting outstanding balance as sum of principalDue
      const sumPrincipal = rawSchedule.reduce((s, r) => s + (Number(r.principalDue || 0)), 0)
      let runningBalance = +sumPrincipal.toFixed(2)

      const repaymentSchedule = rawSchedule.map((r, idx) => {
        const principal = Number(r.principalDue ?? 0)
        const interest = Number(r.interestDue ?? 0)
        const lateFee = Number(r.lateFee ?? 0)
        const paymentAmount = +(principal + interest + lateFee).toFixed(2)

        // decrement running balance by principal portion
        runningBalance = +((runningBalance - principal)).toFixed(2)

        return {
          paymentNumber: idx + 1,                 // incremental id 1,2,3,...
          dueDateInWords: r.dueDateInWords || '',
          dueDate: r.dueDate || '',
          paymentAmount: isFinite(paymentAmount) ? paymentAmount : null,
          principalDue: isFinite(principal) ? principal : null,
          interestDue: isFinite(interest) ? interest : null,
          lateFee: isFinite(lateFee) ? lateFee : null,
          status: r.status || '',
          paidAmount: r.paidAmount ?? null,
          paidAt: r.paidAt ?? null,
          remainingBalance: isFinite(runningBalance) ? runningBalance : null
        }
      })

      const totalPaymentAmount = repaymentSchedule.reduce((s, row) => s + (Number(row.paymentAmount) || 0), 0)

      console.log('[Debug] repaymentSchedule length:', repaymentSchedule.length)
      console.log('[Debug] totalPaymentAmount:', totalPaymentAmount)

      // ─────────────────────────────────────────────────────────────
      // 5️⃣ Render HTML with inlined signatures and repayment schedule
      // ─────────────────────────────────────────────────────────────
      const context = {
        ...result.values,
        lenderWitnessName: adminInitials.ceoFullNames,
        directorName: adminInitials.directorFullNames,
        signature: signatureDataURI,
        witnessSignature: witnessSignatureDataURI,
        initials: initialsDataURI,
        witnessInitials: witnessInitialsDataURI,
        directorSignature: directorSignatureDataURI,
        ceoSignature: ceoSignatureDataURI,
        directorInitials: directorInitialsDataURI,
        ceoInitials: ceoInitialsDataURI,
        isLand:   result.values.propertyName === 'Property Name: land' || result.values.propertyName === 'land',
        isHouse:  result.values.propertyName === 'Property Name: house'  || result.values.propertyName === 'house',
        isVehicle:result.values.propertyName === 'Property Name: vehicle'  || result.values.propertyName === 'vehicle',
        repaymentSchedule,
        totalPaymentAmount
      }
      const html = template(context)
      console.log('[Debug] Generated HTML length:', html.length)


      // 6. Generate PDF buffer
      // const browser = await puppeteer.launch({ headless: true })
      const browser = await puppeteer.launch({
        headless: true,   // or false, as you need
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // (you can keep any other flags you already had)
        ],
      })
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: { top: '0.5in', bottom: '0.5in' },
      })
      await browser.close()

      // 7. Write buffer to temp file
      tmpFilePath = path.join(os.tmpdir(), `${result.formName}-${result.id}.pdf`)
      await fs.writeFile(tmpFilePath, pdfBuffer)
      console.log('[Debug] Temp PDF path:', tmpFilePath)

      // 8a. Upload raw PDF to Media Library
      const uploadService = strapi.plugin('upload').service('upload')
      const [fileEntry] = await uploadService.upload({
        data: {}, 
        files: [{
          path: tmpFilePath,
          name: `${result.formName}_clientid_${result.clientId}_lid_${result.loanId}.pdf`,
          type: 'application/pdf',
          size: pdfBuffer.length,    // prevent NaN
        }],
      })
      //console.log('LoanSchedule', rawSchedule)
      console.log('[Debug] Media Library entry:', fileEntry.id, fileEntry.url)

      // 8b. Fetch the specific applicationForms entry
      const userFull = await strapi
        .query('plugin::users-permissions.user')
        .findOne({
          where: { id: clientId },
          populate: ['applicationForms']
        })
      const forms = userFull.applicationForms || []
      const idx = forms.findIndex(f => f.id === appFormId)
      console.log('[Debug] applicationFormId found at index:', idx)
      if (idx === -1) {
        throw new Error(`applicationFormId ${appFormId} not found`)
      }

      // 9. Push new file ID into signedForm array
      const existing = Array.isArray(forms[idx].signedForm)
        ? forms[idx].signedForm
        : (forms[idx].signedForm ? [forms[idx].signedForm] : [])
      existing.push(fileEntry.id)
      forms[idx].signedForm = existing
      console.log('[Debug] New signedForm array:', forms[idx].signedForm)

      // 10. Persist updated applicationForms
      await strapi.entityService.update(
        'plugin::users-permissions.user',
        clientId,
        { data: { applicationForms: forms } }
      )
      console.log('[Debug] Persisted updated applicationForms for user', clientId)
      // push the file into the loanAgreementDocuments aspect of the loan
      console.log('result.loanId',result.loanId)
      await strapi.entityService.update('api::loan.loan', result.loanId, { data: { loanAgreementDocuments: [{ id: Number(fileEntry.id) }] } })

    } catch (err) {
      console.error('[Error] afterUpdate failed:', err)
      throw err
    } finally {
      // 11. Clean up temp file
      if (tmpFilePath) {
        try {
          await fs.unlink(tmpFilePath)
          console.log('[Debug] Deleted temp file:', tmpFilePath)
        } catch (cleanupErr) {
          console.warn('[Warning] Temp file cleanup failed:', cleanupErr)
        }
      }
    }
  },
}