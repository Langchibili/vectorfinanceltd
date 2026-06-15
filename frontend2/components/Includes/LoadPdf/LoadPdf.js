// 'use client'

// import * as pdfjsLib from 'pdfjs-dist'
// import { PDFDocument } from 'pdf-lib'
// import { useEffect, useRef, useState } from 'react'
// import GeneralLoanForm from '@/components/ESigningForms/NewLoanForm/GeneralLoanForm'

// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`

// const LoadPdf = ({ pdfUrl, strapiUploadUrl, authToken }) => {
//   const containerRef = useRef(null)
//   const [editableFields, setEditableFields] = useState([])
//   const [pdfDocument, setPdfDocument] = useState(null)

//   const loadPdf = async (pdfUrl) => {
//     const loadingTask = pdfjsLib.getDocument(pdfUrl)
//     const pdf = await loadingTask.promise
//     setPdfDocument(pdf)

//     const fields = []

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i)
//       const viewport = page.getViewport({ scale: 2 })

//       // Create a canvas for rendering the page
//       const canvas = document.createElement('canvas')
//       const context = canvas.getContext('2d')
//       canvas.width = viewport.width
//       canvas.height = viewport.height

//       // Render the PDF page into the canvas
//       await page.render({ canvasContext: context, viewport }).promise

//       // Append the canvas to the container
//       const pageContainer = document.createElement('div')
//       pageContainer.style.position = 'relative'
//       pageContainer.style.marginBottom = '20px'
//       pageContainer.appendChild(canvas)

//       containerRef.current.appendChild(pageContainer)

//       // Detect editable fields on the page
//       const textContent = await page.getTextContent()
//       textContent.items.forEach((item) => {
//         // Check if the text matches the editable pattern (e.g., "....")
//         if (/^\.+$/.test(item.str.trim())) {
//           const transform = item.transform
//           const [x, y] = [transform[4], transform[5]]
//           const [mappedX, mappedY] = viewport.convertToViewportPoint(x, y)

//           fields.push({
//             page: i,
//             x: mappedX,
//             y: viewport.height - mappedY, // Flip Y-axis
//             width: item.width * viewport.scale, // Scale width
//             height: 20, // Fixed height for inputs
//             value: '',
//           })

//           // Add input for this field
//           const input = document.createElement('input')
//           input.type = 'text'
//           input.style.position = 'absolute'
//           input.style.left = `${mappedX}px`
//           input.style.top = `${viewport.height - mappedY}px`
//           input.style.width = `${item.width * viewport.scale}px`
//           input.style.height = '25px'
//           input.style.border = '1px solid #ccc'
//           input.style.backgroundColor = 'transparent'
//           input.style.zIndex = 10
//           input.style.verticalAlign = "text-top"

//           input.addEventListener('input', (e) => {
//             fields.find(
//               (field) => field.page === i && field.x === mappedX && field.y === mappedY
//             ).value = e.target.value
//           })

//           pageContainer.appendChild(input)
//         }
//       })
//     }

//     setEditableFields(fields)
//   }

//   const savePdf = async () => {
//     if (!pdfDocument) return

//     // Load the original PDF with pdf-lib
//     const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
//     const pdfDoc = await PDFDocument.load(pdfBytes)

//     // Update editable fields in the PDF
//     editableFields.forEach((field) => {
//       const page = pdfDoc.getPage(field.page - 1)
//       page.drawText(field.value, {
//         x: field.x,
//         y: field.y,
//         size: 12,
//         color: pdfDoc.getRgbColor(0, 0, 0),
//       })
//     })

//     // Serialize the PDF
//     const updatedPdfBytes = await pdfDoc.save()

//     // Upload to Strapi
//     const formData = new FormData()
//     formData.append(
//       'files',
//       new Blob([updatedPdfBytes], { type: 'application/pdf' }),
//       'updated-document.pdf'
//     )

//     const response = await fetch(strapiUploadUrl, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//       body: formData,
//     })

//     if (response.ok) {
//       console.log('PDF uploaded successfully')
//     } else {
//       console.error('Failed to upload PDF')
//     }
//   }

//   useEffect(() => {
//     loadPdf(pdfUrl)
//   }, [pdfUrl])

//   return (
//     <div>
//         <GeneralLoanForm/>
//       {/* <div ref={containerRef} style={{ position: 'relative', width: '100%' }} />
//       <button onClick={savePdf} style={{ marginTop: '20px' }}>
//         Save PDF
//       </button> */}
//     </div>
//   )
// }

// export default LoadPdf
'use client'

import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocument } from 'pdf-lib'
import { useEffect, useRef, useState } from 'react'
import GeneralLoanForm from '@/components/ESigningForms/NewLoanForm/GeneralLoanForm'

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`

/* ─── colour tokens ─────────────────────────────────────────── */
const G = {
  page: '#0A0F1E',
  green1: '#059669',
  green2: '#10B981',
  green3: '#34D399',
  dim: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.08)',
  muted: 'rgba(255,255,255,0.38)',
}

const LoadPdf = ({ pdfUrl, strapiUploadUrl, authToken }) => {
  const containerRef = useRef(null)
  const [editableFields, setEditableFields] = useState([])
  const [pdfDocument, setPdfDocument] = useState(null)

  // ── ALL LOGIC UNCHANGED ──────────────────────────────────────

  const loadPdf = async (pdfUrl) => {
    console.log('this.props', this.props)
    const loadingTask = pdfjsLib.getDocument(pdfUrl)
    const pdf = await loadingTask.promise
    setPdfDocument(pdf)

    const fields = []

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2 })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({ canvasContext: context, viewport }).promise

      const pageContainer = document.createElement('div')
      pageContainer.style.position = 'relative'
      pageContainer.style.marginBottom = '20px'
      // Dark theme page styling
      pageContainer.style.borderRadius = '12px'
      pageContainer.style.overflow = 'hidden'
      pageContainer.style.border = '1px solid rgba(255,255,255,0.08)'
      pageContainer.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
      pageContainer.appendChild(canvas)

      containerRef.current.appendChild(pageContainer)

      const textContent = await page.getTextContent()
      textContent.items.forEach((item) => {
        if (/^\.+$/.test(item.str.trim())) {
          const transform = item.transform
          const [x, y] = [transform[4], transform[5]]
          const [mappedX, mappedY] = viewport.convertToViewportPoint(x, y)

          fields.push({
            page: i,
            x: mappedX,
            y: viewport.height - mappedY,
            width: item.width * viewport.scale,
            height: 20,
            value: '',
          })

          const input = document.createElement('input')
          input.type = 'text'
          input.style.position = 'absolute'
          input.style.left = `${mappedX}px`
          input.style.top = `${viewport.height - mappedY}px`
          input.style.width = `${item.width * viewport.scale}px`
          input.style.height = '25px'
          input.style.border = '1px solid rgba(16,185,129,0.4)'
          input.style.backgroundColor = 'rgba(16,185,129,0.08)'
          input.style.color = '#fff'
          input.style.borderRadius = '4px'
          input.style.zIndex = 10
          input.style.verticalAlign = 'text-top'
          input.style.outline = 'none'
          input.style.padding = '0 4px'
          input.style.fontSize = '12px'

          input.addEventListener('focus', () => {
            input.style.border = '1px solid rgba(16,185,129,0.8)'
            input.style.backgroundColor = 'rgba(16,185,129,0.14)'
          })
          input.addEventListener('blur', () => {
            input.style.border = '1px solid rgba(16,185,129,0.4)'
            input.style.backgroundColor = 'rgba(16,185,129,0.08)'
          })

          input.addEventListener('input', (e) => {
            fields.find(
              (field) => field.page === i && field.x === mappedX && field.y === mappedY
            ).value = e.target.value
          })

          pageContainer.appendChild(input)
        }
      })
    }

    setEditableFields(fields)
  }

  const savePdf = async () => {
    if (!pdfDocument) return

    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(pdfBytes)

    editableFields.forEach((field) => {
      const page = pdfDoc.getPage(field.page - 1)
      page.drawText(field.value, {
        x: field.x,
        y: field.y,
        size: 12,
        color: pdfDoc.getRgbColor(0, 0, 0),
      })
    })

    const updatedPdfBytes = await pdfDoc.save()

    const formData = new FormData()
    formData.append(
      'files',
      new Blob([updatedPdfBytes], { type: 'application/pdf' }),
      'updated-document.pdf'
    )

    const response = await fetch(strapiUploadUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: formData,
    })

    if (response.ok) {
      console.log('PDF uploaded successfully')
    } else {
      console.error('Failed to upload PDF')
    }
  }

  useEffect(() => {
    loadPdf(pdfUrl)
  }, [pdfUrl])

  // ── RENDER ───────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: G.page,
      position: 'relative',
    }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <GeneralLoanForm />

        {/* PDF viewer — currently commented out matching original */}
        {/* <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted }}>Document Review</p>
            <h2 style={{ margin: 0, fontSize: 22, color: '#fff' }}>Sign your documents</h2>
          </div>

          <div
            ref={containerRef}
            style={{ position: 'relative', width: '100%' }}
          />

          <div style={{ marginTop: 24 }}>
            <button
              onClick={savePdf}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '12px 28px', fontSize: 14, fontWeight: 700,
                background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
                color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
              }}
            >
              Save & Upload PDF
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default LoadPdf