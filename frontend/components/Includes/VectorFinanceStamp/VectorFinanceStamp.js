'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function VectorFinanceStamp() {
  const canvasRef = useRef(null)
  const [width, setWidth] = useState(900)
  const [height, setHeight] = useState(300)
  const [contact, setContact] = useState('info@vectorfinancelimited.com | +260972..../+260972....')
  const [seed, setSeed] = useState(0) // bump to force redraw

  function formatTodayUpper() {
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
    const month = months[now.getMonth()]
    const yyyy = now.getFullYear()
    return `${dd} ${month} ${yyyy}`
  }

  // draw function
  function drawStamp() {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = Number(width) || 900
    const h = Number(height) || 300
    const dpr = window.devicePixelRatio || 1

    // set canvas CSS size then actual pixel size
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)

    const ctx = canvas.getContext('2d')
    // reset transform and scale for DPR
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    // clear
    ctx.clearRect(0, 0, w, h)

    // basics
    const pad = 18
    const centerX = w / 2
    let y = pad + 28

    // background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    // top dotted row
    drawDottedRow(ctx, pad, w, pad)
    drawDottedRow(ctx, h - pad, w, pad)

    // company name
    ctx.font = 'bold 28px system-ui, -apple-system, Roboto, Arial'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#000'
    ctx.fillText('VECTOR FINANCE LIMITED', centerX, y)

    // decorative small dots below company name
    y += 12
    drawDecorativeDots(ctx, centerX, y + 6, 220)

    // date in red
    y += 38
    ctx.font = 'bold 22px system-ui, -apple-system, Roboto, Arial'
    ctx.fillStyle = 'red'
    ctx.fillText(formatTodayUpper(), centerX, y)

    // decorative dots below date
    y += 12
    drawDecorativeDots(ctx, centerX, y + 6, 180)

    // contact info
    y += 36
    ctx.font = '14px system-ui, -apple-system, Roboto, Arial'
    ctx.fillStyle = '#000'
    ctx.fillText(contact, centerX, y)

    // helper functions
    function drawDottedRow(ctx, yPos, width, pad) {
      const gap = 6
      const r = 1.5
      ctx.beginPath()
      for (let x = pad; x < width - pad; x += gap) {
        ctx.moveTo(x + r, yPos)
        ctx.arc(x, yPos, r, 0, Math.PI * 2)
      }
      ctx.fillStyle = '#000'
      ctx.fill()
    }

    function drawDecorativeDots(ctx, cx, yPos, totalWidth) {
      const spacing = 8
      const radius = 2
      const count = Math.floor(totalWidth / spacing)
      const startX = cx - (count - 1) * spacing / 2
      ctx.beginPath()
      for (let i = 0; i < count; i++) {
        const x = startX + i * spacing
        ctx.moveTo(x + radius, yPos)
        ctx.arc(x, yPos, radius, 0, Math.PI * 2)
      }
      ctx.fillStyle = '#000'
      ctx.fill()
    }
  }

  // initial draw + redraw when dependencies change
  useEffect(() => {
    drawStamp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, contact, seed])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `vector-stamp-${new Date().toISOString().slice(0,10)}.png`
    a.click()
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-4xl">
      <h2 className="text-lg font-semibold mb-3">Vector Finance — Stamp Generator</h2>

      <div className="flex gap-3 items-center mb-3">
        <label className="text-sm">Width</label>
        <input className="border rounded px-2 py-1 w-24" value={width} onChange={e => setWidth(e.target.value)} />
        <label className="text-sm">Height</label>
        <input className="border rounded px-2 py-1 w-24" value={height} onChange={e => setHeight(e.target.value)} />
        <button className="bg-slate-100 border px-3 py-1 rounded" onClick={() => setSeed(s => s + 1)}>Regenerate</button>
        <button className="bg-slate-800 text-white px-3 py-1 rounded" onClick={handleDownload}>Download PNG</button>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Contact line</label>
        <input className="w-full border rounded px-3 py-2" value={contact} onChange={e => setContact(e.target.value)} />
      </div>

      <div className="border p-3 rounded bg-white flex justify-center">
        <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <p className="text-xs text-slate-500 mt-2">Phone placeholders: replace the phone numbers in the contact field to bake them into the stamp.</p>
    </div>
  )
}