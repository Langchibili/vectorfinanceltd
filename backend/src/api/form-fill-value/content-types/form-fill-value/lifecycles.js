'use strict'

// Dependencies to install:
// npm install handlebars puppeteer

const fs = require('fs/promises')
const os = require('os')
const path = require('path')
const Handlebars = require('handlebars')
const puppeteer = require('puppeteer')

module.exports = {
  async afterUpdate(event) {
    const { result } = event
    console.log('[Debug] afterUpdate for FormFillValues ID:', result.id)

    let tmpFilePath = null

    try {
      // 1. Validate IDs
      const clientId = Number(result.clientId)
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
      const template = Handlebars.compile(raw)

      // 3. Fetch user + signatures
      const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({
          where: { id: clientId },
          populate: ['signature', 'witnessSignature'],
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
      const signatureDataURI        = await fileToDataURI(user.signature)
      const witnessSignatureDataURI = await fileToDataURI(user.witnessSignature)
      console.log('[Debug] signatureDataURI length:', signatureDataURI.length)
      console.log('[Debug] witnessSignatureDataURI length:', witnessSignatureDataURI.length)

      // ─────────────────────────────────────────────────────────────
      // 5️⃣ Render HTML with inlined signatures
      // ─────────────────────────────────────────────────────────────
      const context = {
        ...result.values,
        signature:        signatureDataURI,
        witnessSignature: witnessSignatureDataURI,
      }
      const html = template(context)
      console.log('[Debug] Generated HTML length:', html.length)


      // 5. Generate PDF buffer
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: { top: '0.5in', bottom: '0.5in' },
      })
      await browser.close()

      // 6. Write buffer to temp file
      tmpFilePath = path.join(os.tmpdir(), `${result.formName}-${result.id}.pdf`)
      await fs.writeFile(tmpFilePath, pdfBuffer)
      console.log('[Debug] Temp PDF path:', tmpFilePath)

      // 7a. Upload raw PDF to Media Library
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
      console.log('[Debug] Media Library entry:', fileEntry.id, fileEntry.url)

      // 7b. Fetch the specific applicationForms entry
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

      // 8. Push new file ID into signedForm array
      const existing = Array.isArray(forms[idx].signedForm)
        ? forms[idx].signedForm
        : (forms[idx].signedForm ? [forms[idx].signedForm] : [])
      existing.push(fileEntry.id)
      forms[idx].signedForm = existing
      console.log('[Debug] New signedForm array:', forms[idx].signedForm)

      // 9. Persist updated applicationForms
      await strapi.entityService.update(
        'plugin::users-permissions.user',
        clientId,
        { data: { applicationForms: forms } }
      )
      console.log('[Debug] Persisted updated applicationForms for user', clientId)

    } catch (err) {
      console.error('[Error] afterUpdate failed:', err)
      throw err

    } finally {
      // 10. Clean up temp file
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
