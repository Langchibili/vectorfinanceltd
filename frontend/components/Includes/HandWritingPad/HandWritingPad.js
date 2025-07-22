import { api_url, backEndUrl, getJwt } from '@/Constants'
import { Button } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'

const HandWritingPad = (props) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [handwritingImage, setHandwritingImage] = useState(null)
  const [signatureImage, setSignatureImage] = useState(null)
  const [initialsImage, setInitialsImage] = useState(null)
  const [witnessSignatureImage, setWitnessSignatureImage] = useState(null)
  const [witnessInitialsImage, setWitnessInitialsImage] = useState(null)
  const [directorSignatureImage, setDirectorSignatureImage] = useState(null)
  const [directorInitialsImage, setDirectorInitialsImage] = useState(null)
  const [ceoSignatureImage, setCeoSignatureImage] = useState(null)
  const [ceoInitialsImage, setCeoInitialsImage] = useState(null)
  const [brushSize, setBrushSize] = useState(2)
  const [brushColor, setBrushColor] = useState('#000000')


  // Resize canvas based on screen size for responsiveness
  useEffect(() => {
    if (props.loggedInUser?.signature?.url) {
        const newImage = backEndUrl + props.loggedInUser.signature.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setSignatureImage(newImage)
          setHandwritingImage(newImage)
        }
      
    }
    if (props.handleInitialsSave) {
      if (props.loggedInUser?.initials?.url) {
        const newImage = backEndUrl + props.loggedInUser.initials.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setInitialsImage(newImage)
          setHandwritingImage(newImage)
        }
      } 
    }
   if (props.handleWitnessSignatureSave) {
      if (props.loggedInUser?.witnessSignature?.url) {
        const newImage = backEndUrl + props.loggedInUser.witnessSignature.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setWitnessSignatureImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    } 
    if (props.handleWitnessInitialsSave) {
      if (props.loggedInUser?.witnessInitials?.url) {
        const newImage = backEndUrl + props.loggedInUser.witnessInitials.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setWitnessInitialsImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    } 
    if (props.handleDirectorSignatureSave) {
      if (props.constants?.adminSignatures?.directorSignature?.url) {
        const newImage = backEndUrl + props.constants.adminSignatures.directorSignature.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setDirectorSignatureImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    } 
    if (props.handleDirectorInitialsSave) {
      if (props.constants?.adminInitials?.directorInitials?.url) {
        const newImage = backEndUrl + props.constants.adminInitials.directorInitials.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setDirectorInitialsImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    } 
    
    if (props.handleCeoSignatureSave) {
      if (props.constants?.adminSignatures?.ceoSignature?.url) {
        const newImage = backEndUrl + props.constants.adminSignatures.ceoSignature.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setCeoSignatureImage(newImage)
          setHandwritingImage(newImage)
        }
      }
    } 
    if (props.handleCeoInitialsSave) {
      if (props.constants?.adminInitials?.ceoInitials?.url) {
        const newImage = backEndUrl + props.constants.adminInitials.ceoInitials.url
        if (newImage !== handwritingImage) { // Prevent redundant updates
          setCeoInitialsImage(newImage)
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
    console.log("props",props)
    if (props.handleSignatureSave) {
        setSignatureImage(dataURL)
    }
    if (props.handleInitialsSave) {
        setInitialsImage(dataURL)
    }
    if (props.handleWitnessSignatureSave) {
        setWitnessSignatureImage(dataURL)
    }
    if (props.handleWitnessInitialsSave) {
        setWitnessInitialsImage(dataURL)
    }
    if (props.handleDirectorSignatureSave) {
        setDirectorSignatureImage(dataURL)
    }
    if (props.handleDirectorInitialsSave) {
        setDirectorInitialsImage(dataURL)
    }
    if (props.handleCeoSignatureSave) {
       setCeoInitialsImage(dataURL)
    }
    if (props.handleCeoInitialsSave) {
       setCeoInitialsImage(dataURL)
    } 
    // Convert base64 to a blob
    const blob = await fetch(dataURL).then(res => res.blob())
    let formData = new FormData()
    if(props.handleInitialsSave){ // for the witness
      formData.append('files', blob, props.loggedInUser.id+'_initials.png') // Append the file
      formData.append('ref', 'plugin::users-permissions.user') // Strapi model reference
      formData.append('refId', props.loggedInUser.id) // User ID
      formData.append('field', 'initials') // Field name in Strapi
    }
    else if(props.handleWitnessSignatureSave){ // for the witness
      formData.append('files', blob, props.loggedInUser.id+'_witness_signature.png') // Append the file
      formData.append('ref', 'plugin::users-permissions.user') // Strapi model reference
      formData.append('refId', props.loggedInUser.id) // User ID
      formData.append('field', 'witnessSignature') // Field name in Strapi
    }
    else if(props.handleWitnessInitialsSave){ // for the loan applicant
      formData.append('files', blob, props.loggedInUser.id+'_witnessInitials.png') // Append the file
      formData.append('ref', 'plugin::users-permissions.user') // Strapi model reference
      formData.append('refId', props.loggedInUser.id) // User ID
      formData.append('field', 'witnessInitials') // Field name in Strapi
    }
    else if(props.handleDirectorSignatureSave){ // for the loan applicant
      formData.append('files', blob, 'directorSignature.png') // Append the file
      formData.append('ref', 'api::admin-signature.admin-signature') // Strapi model reference
      formData.append('refId', 1) // User ID
      formData.append('field', 'director') // Field name in Strapi
    }
    else if(props.handleCeoSignatureSave){ // for the loan applicant
      formData.append('files', blob, 'ceoSignature.png') // Append the file
      formData.append('ref', 'api::admin-signature.admin-signature') // Strapi model reference
      formData.append('refId', 1) // User ID
      formData.append('field', 'ceo') // Field name in Strapi
    }
    else if(props.handleDirectorInitialsSave){ // for the loan applicant
      formData.append('files', blob, 'directorInitials.png') // Append the file
      formData.append('ref', 'api::admin-initial.admin-initial') // Strapi model reference
      formData.append('refId', 1) // User ID
      formData.append('field', 'director') // Field name in Strapi
    }
    else if(props.handleCeoInitialsSave){ // for the loan applicant
      formData.append('files', blob, 'ceoInitials.png') // Append the file
      formData.append('ref', 'api::admin-initial.admin-initial') // Strapi model reference
      formData.append('refId', 1) // User ID
      formData.append('field', 'ceo') // Field name in Strapi
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
  
      console.log("response",response)

      if (response.ok) {
        const result = await response.json()
        if (props.handleSignatureSave) {
            props.handleSignatureSave(result[0])
        }
        if (props.handleInitialsSave) {
            props.handleInitialsSave(result[0])
        }
        if (props.handleWitnessSignatureSave) {
            props.handleWitnessSignatureSave(result[0])
        }
        if (props.handleWitnessInitialsSave) {
            props.handleWitnessInitialsSave(result[0])
        }
        if (props.handleDirectorSignatureSave) {
            props.handleDirectorSignatureSave(result[0])
        } 
        if (props.handleDirectorInitialsSave) {
            props.handleDirectorInitialsSave(result[0])
        }
        if (props.handleCeoSignatureSave) {
            props.handleCeoSignatureSave(result[0])
        }
        if (props.handleCeoInitialsSave) {
            props.handleCeoInitialsSave(result[0])
        }
        console.log('API Response:', result)
      }
      else {
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
    if (props.handleSignatureSave) {
        props.handleSignatureSave(dataURL)
    }
    if (props.handleInitialsSave) {
        props.handleInitialsSave(dataURL)
    }
    if (props.handleWitnessSignatureSave) {
        props.handleWitnessSignatureSave(dataURL)
    }
    if (props.handleWitnessInitialsSave) {
        props.handleWitnessInitialsSave(dataURL)
    }
    if (props.handleDirectorSignatureSave) {
        props.handleDirectorSignatureSave(dataURL)
    }
    if (props.handleDirectorInitialsSave) {
        props.handleDirectorInitialsSave(dataURL)
    }
    if (props.handleCeoSignatureSave) {
        props.handleCeoSignatureSave(dataURL)
    }
    if (props.handleCeoInitialsSave) {
        props.handleCeoInitialsSave(dataURL)
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

const renderSignature = () => {
  // Director
  if (props.handleDirectorSignatureSave) {
    return directorSignatureImage ? (
      <div>
        <h4>Director's Signature</h4>
        <img
          src={directorSignatureImage}
          alt="Director's Signature"
          style={{ border: '1px solid #000', backgroundColor: '#fff' }}
        />
      </div>
    ) : null
  }

  // CEO
  if (props.handleCeoSignatureSave) {
    return ceoSignatureImage ? (
      <div>
        <h4>CEO's Signature</h4>
        <img
          src={ceoSignatureImage}
          alt="CEO's Signature"
          style={{ border: '1px solid #000', backgroundColor: '#fff' }}
        />
      </div>
    ) : null
  }

  // Generic with witness
  if (props.handleWitnessSignatureSave) {
    // show applicant's first, then witness
    // if (signatureImage) {
    //   return (
    //     <div>
    //       <h4>Your Signature</h4>
    //       <img
    //         src={signatureImage}
    //         alt="Signature"
    //         style={{ border: '1px solid #000', backgroundColor: '#fff' }}
    //       />
    //     </div>
    //   )
    // }
    if (witnessSignatureImage) {
      return (
        <div>
          <h4>Witness's Signature</h4>
          <img
            src={witnessSignatureImage}
            alt="Witness's Signature"
            style={{ border: '1px solid #000', backgroundColor: '#fff' }}
          />
        </div>
      )
    }
    return null
  }

  // Pure generic
  return signatureImage ? (
    <div>
      <h4>Signature</h4>
      <img
        src={signatureImage}
        alt="Signature"
        style={{ border: '1px solid #000', backgroundColor: '#fff' }}
      />
    </div>
  ) : null
}

const renderInitials = () => {
  // Director
  if (props.handleDirectorInitialsSave) {
    return directorInitialsImage ? (
      <div>
        <h4>Director's Initials</h4>
        <img
          src={directorInitialsImage}
          alt="Director's Initials"
          style={{ border: '1px solid #000', backgroundColor: '#fff' }}
        />
      </div>
    ) : null
  }

  // CEO
  if (props.handleCeoInitialsSave) {
    return ceoInitialsImage ? (
      <div>
        <h4>CEO's Initials</h4>
        <img
          src={ceoInitialsImage}
          alt="CEO's Initials"
          style={{ border: '1px solid #000', backgroundColor: '#fff' }}
        />
      </div>
    ) : null
  }

  // Generic with witness
  if (props.handleWitnessInitialsSave) {
    // show applicant's first, then witness
    if (initialsImage) {
      return (
        <div>
          <h4>Your Initials</h4>
          <img
            src={initialsImage}
            alt="Initials"
            style={{ border: '1px solid #000', backgroundColor: '#fff' }}
          />
        </div>
      )
    }
    if (initialsImage) {
      return (
        <div>
          <h4>Your Initials</h4>
          <img
            src={initialsImage}
            alt="Your Initials"
            style={{ border: '1px solid #000', backgroundColor: '#fff' }}
          />
        </div>
      )
    }
    if (witnessInitialsImage) {
      return (
        <div>
          <h4>Witness's Initials</h4>
          <img
            src={witnessInitialsImage}
            alt="Witness's Initials"
            style={{ border: '1px solid #000', backgroundColor: '#fff' }}
          />
        </div>
      )
    }
    return null
  }

  // Pure generic
  return initialsImage ? (
    <div>
      <h4>Initials</h4>
      <img
        src={initialsImage}
        alt="Initials"
        style={{ border: '1px solid #000', backgroundColor: '#fff' }}
      />
    </div>
  ) : null
}

const renderTitle = () => {
  if (props.handleDirectorSignatureSave) {
    return <h3 style={{ textAlign: 'left' }}>Director’s Signature</h3>
  }
  if (props.handleDirectorInitialsSave) {
    return <h3 style={{ textAlign: 'left' }}>Director’s Initials</h3>
  }
  if (props.handleCeoSignatureSave) {
    return <h3 style={{ textAlign: 'left' }}>CEO’s Signature</h3>
  }
  if (props.handleCeoInitialsSave) {
    return <h3 style={{ textAlign: 'left' }}>CEO’s Initials</h3>
  }
  if (props.handleWitnessSignatureSave) {
    return (
      <h3 style={{ textAlign: 'left' }}>
        A Witness’s Signature
        <small> (should be entered by the witness, not you)</small>
      </h3>
    )
  }
  if (props.handleWitnessInitialsSave) {
    return (
      <h3 style={{ textAlign: 'left' }}>
        A Witness’s Initials
        <small> (should be entered by the witness, not you)</small>
      </h3>
    )
  }
  if (props.handleSignatureSave) {
    return <h3 style={{ textAlign: 'left' }}>Write Your Signature</h3>
  }
  if (props.handleInitialsSave) {
    return <h3 style={{ textAlign: 'left' }}>Write Your Initials</h3>
  }
  return null
}



  return (
    <div style={{ textAlign: 'center', position: 'fixed', width: '100%' , margin:'0 auto'}}>
      {renderTitle()}
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
            src={props.handleWitnessSignatureSave? witnessSignatureImage : signatureImage}
            alt="signature"
            style={{
              border: '1px solid #000',
              backgroundColor: '#fff',
            }}
          />
        </div>
      )} */}
     {renderSignature()}
     {renderInitials()}
    </div>
  )
}

export default HandWritingPad
