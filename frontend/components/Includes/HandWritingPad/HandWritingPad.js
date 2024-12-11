import React, { useRef, useState, useEffect } from 'react'

const HandWritingPad = () => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [handwritingImage, setHandwritingImage] = useState(null)
  const [brushSize, setBrushSize] = useState(2)
  const [brushColor, setBrushColor] = useState('#000000')

  // Resize canvas based on screen size for responsiveness
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = 400 // Adjust height as needed
    const context = canvas.getContext('2d')
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = brushSize
    context.strokeStyle = brushColor
  }, [brushSize, brushColor])

  // Get touch/mouse position relative to the canvas
  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const offsetX = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
    const offsetY = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY
    return { x: offsetX, y: offsetY }
  }

  const startDrawing = (e) => {
    e.preventDefault() // Prevent scrolling on touch
    const { x, y } = getCanvasCoordinates(e)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault() // Prevent scrolling on touch
    const { x, y } = getCanvasCoordinates(e)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const saveHandwriting = () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL('image/png')
    setHandwritingImage(dataURL)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    setHandwritingImage(null)
  }

  return (
    <div style={{ textAlign: 'center', position: 'fixed', width: '100%' }}>
      <h2>Handwriting Canvas</h2>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#f5f5f5',
          touchAction: 'none', // Prevent touch gestures from interfering
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      ></canvas>
      <div style={{ margin: '10px' }}>
        <label>
          Brush Size:
          <input
            type="range"
            min="2"
            max="10"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ margin: '0 10px' }}
          />
        </label>
        <label>
          Brush Color:
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </label>
        <div style={{ marginTop: '10px' }}>
          <button onClick={saveHandwriting}>Save Handwriting</button>
          <button onClick={clearCanvas}>Clear</button>
        </div>
      </div>
      {handwritingImage && (
        <div>
          <h3>Saved Handwriting:</h3>
          <img
            src={handwritingImage}
            alt="Handwritten Text"
            style={{
              border: '1px solid #000',
              backgroundColor: '#fff',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default HandWritingPad
