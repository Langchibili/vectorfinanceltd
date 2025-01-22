'use client'

import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocument } from 'pdf-lib'
import { useEffect, useRef, useState } from 'react'
import SalesAgreementForm from '@/components/ESigningForms/SalesAgreementForm/SalesAgreementForm'
import NewLoanForm from '@/components/ESigningForms/NewLoanForm/NewLoanForm'

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`

const LoadPdf = ({ pdfUrl, strapiUploadUrl, authToken }) => {
  const containerRef = useRef(null)
  const [editableFields, setEditableFields] = useState([])
  const [pdfDocument, setPdfDocument] = useState(null)

  const loadPdf = async (pdfUrl) => {
    const loadingTask = pdfjsLib.getDocument(pdfUrl)
    const pdf = await loadingTask.promise
    setPdfDocument(pdf)

    const fields = []

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2 })

      // Create a canvas for rendering the page
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = viewport.width
      canvas.height = viewport.height

      // Render the PDF page into the canvas
      await page.render({ canvasContext: context, viewport }).promise

      // Append the canvas to the container
      const pageContainer = document.createElement('div')
      pageContainer.style.position = 'relative'
      pageContainer.style.marginBottom = '20px'
      pageContainer.appendChild(canvas)

      containerRef.current.appendChild(pageContainer)

      // Detect editable fields on the page
      const textContent = await page.getTextContent()
      textContent.items.forEach((item) => {
        // Check if the text matches the editable pattern (e.g., "....")
        if (/^\.+$/.test(item.str.trim())) {
          const transform = item.transform
          const [x, y] = [transform[4], transform[5]]
          const [mappedX, mappedY] = viewport.convertToViewportPoint(x, y)

          fields.push({
            page: i,
            x: mappedX,
            y: viewport.height - mappedY, // Flip Y-axis
            width: item.width * viewport.scale, // Scale width
            height: 20, // Fixed height for inputs
            value: '',
          })

          // Add input for this field
          const input = document.createElement('input')
          input.type = 'text'
          input.style.position = 'absolute'
          input.style.left = `${mappedX}px`
          input.style.top = `${viewport.height - mappedY}px`
          input.style.width = `${item.width * viewport.scale}px`
          input.style.height = '25px'
          input.style.border = '1px solid #ccc'
          input.style.backgroundColor = 'transparent'
          input.style.zIndex = 10
          input.style.verticalAlign = "text-top"

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

    // Load the original PDF with pdf-lib
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(pdfBytes)

    // Update editable fields in the PDF
    editableFields.forEach((field) => {
      const page = pdfDoc.getPage(field.page - 1)
      page.drawText(field.value, {
        x: field.x,
        y: field.y,
        size: 12,
        color: pdfDoc.getRgbColor(0, 0, 0),
      })
    })

    // Serialize the PDF
    const updatedPdfBytes = await pdfDoc.save()

    // Upload to Strapi
    const formData = new FormData()
    formData.append(
      'files',
      new Blob([updatedPdfBytes], { type: 'application/pdf' }),
      'updated-document.pdf'
    )

    const response = await fetch(strapiUploadUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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

  return (
    <div>
        <NewLoanForm/>
      {/* <div ref={containerRef} style={{ position: 'relative', width: '100%' }} />
      <button onClick={savePdf} style={{ marginTop: '20px' }}>
        Save PDF
      </button> */}
    </div>
  )
}

export default LoadPdf
