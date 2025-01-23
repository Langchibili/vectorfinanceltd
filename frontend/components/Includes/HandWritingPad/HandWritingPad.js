import { api_url, backEndUrl, getJwt } from '@/Constants'
import { Button } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'

const HandWritingPad = (props) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [handwritingImage, setHandwritingImage] = useState(null)
  const [signatureImage, setSignatureImage] = useState(null)
  const [witnesSignatureImage, setWitnesSignatureImage] = useState(null)
  const [brushSize, setBrushSize] = useState(2)
  const [brushColor, setBrushColor] = useState('#000000')

  // useEffect(() => {
   
  // }, [props.handleWitnessSignatureSave, props.loggedInUser, handwritingImage, backEndUrl])
  

  // Resize canvas based on screen size for responsiveness
  useEffect(() => {
    if (props.handleWitnessSignatureSave) {
      if (props.loggedInUser?.witnessSignature?.url) {
        const newImage = backEndUrl + props.loggedInUser.witnessSignature.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setWitnesSignatureImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    } else {
      if (props.loggedInUser?.signature?.url) {
        const newImage = backEndUrl + props.loggedInUser.signature.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setSignatureImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    }
    
    
    const canvas = canvasRef.current
    canvas.width = window.innerWidth < 400? window.innerWidth - 50 : 300
    canvas.height = window.innerHeight - (0.75 * window.innerHeight)
    const context = canvas.getContext('2d')
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = brushSize
    context.strokeStyle = brushColor
  }, [props.handleWitnessSignatureSave, props.loggedInUser, brushSize, brushColor])
 
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

  const saveHandwritingToAPI = async () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL('image/png') // Get the image data
    setHandwritingImage(dataURL) // Update state with the data URL
    
    if(props.handleWitnessSignatureSave){
      setWitnesSignatureImage(dataURL)
    }
    else{
      setSignatureImage(dataURL)
    }
    // Convert base64 to a blob
    const blob = await fetch(dataURL).then(res => res.blob())
    let formData = new FormData()
    if(props.handleWitnessSignatureSave){ // for the witness
      formData.append('files', blob, props.loggedInUser.id+'_witness_signature.png') // Append the file
      formData.append('ref', 'plugin::users-permissions.user') // Strapi model reference
      formData.append('refId', props.loggedInUser.id) // User ID
      formData.append('field', 'witnessSignature') // Field name in Strapi
    }
    else{ // for the loan applicant
      formData.append('files', blob, props.loggedInUser.id+'_signature.png') // Append the file
      formData.append('ref', 'plugin::users-permissions.user') // Strapi model reference
      formData.append('refId', props.loggedInUser.id) // User ID
      formData.append('field', 'signature') // Field name in Strapi
    }
  
    try {
      const response = await fetch(`${api_url}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getJwt()}`, // Replace with the user's JWT token
        },
        body: formData,
      })
  
      if (response.ok) {
        const result = await response.json()
        if(props.handleSignatureSave){
          props.handleSignatureSave(result[0])
        }
        if(props.handleWitnessSignatureSave){
          props.handleWitnessSignatureSave(result[0])
        }
        console.log('API Response:', result)
      } else {
        console.error('Failed to save signature:', response.statusText)
        alert('Failed to save signature. Please try again.')
      }
    } catch (error) {
      console.error('Error uploading signature:', error)
      alert('An error occurred while saving the signature.')
    }
  }

  const saveHandwriting = () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL('image/png')
    if(props.handleSignatureSave){
      props.handleSignatureSave(dataURL)
    }
    if(props.handleWitnessSignatureSave){
      props.handleWitnessSignatureSave(dataURL)
    }
    setHandwritingImage(dataURL) // save handwriting in order to show it on the screen
    saveHandwritingToAPI() // save to the backend
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    setHandwritingImage(null)
  }

  return (
    <div style={{ textAlign: 'center', position: 'fixed', width: '100%' , margin:'0 auto'}}>
      <h3 style={{textAlign:'left'}}>{props.handleWitnessSignatureSave? "A witness's signature" : "Write your signature"}<small>{props.handleWitnessSignatureSave? "  (should be entered by the witness not you)" : ""}</small></h3>
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
      <div style={{ margin: '10px',textAlign:'left' }}>
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
        {/* <label>
          Brush Color:
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </label> */}
        <div style={{ marginTop: '10px'}}>
          <Button onClick={saveHandwriting} variant="outlined">Save Signature</Button>
          <Button onClick={clearCanvas} variant="outlined" color='secondary' sx={{marginLeft:'10px'}}>Clear</Button>
        </div>
      </div>
      {/* {handwritingImage && (
        <div key={props.handleWitnessSignatureSave? 'witness' : 'signature'}>
          <h4>Saved Handwriting:</h4>
          <img
            src={props.handleWitnessSignatureSave? witnesSignatureImage : signatureImage}
            alt="signature"
            style={{
              border: '1px solid #000',
              backgroundColor: '#fff',
            }}
          />
        </div>
      )} */}
      {props.handleWitnessSignatureSave? (
        witnesSignatureImage? <div>
          <h4>Saved Handwriting:</h4>
          <img
            src={witnesSignatureImage}
            alt="signature"
            style={{
              border: '1px solid #000',
              backgroundColor: '#fff',
            }}
          />
        </div> : <></>
      ) : (
        signatureImage? <div>
          <h4>Saved Handwriting:</h4>
          <img
            src={signatureImage}
            alt="signature"
            style={{
              border: '1px solid #000',
              backgroundColor: '#fff',
            }}
          />
        </div> : <></>
      ) }
    </div>
  )
}

export default HandWritingPad
