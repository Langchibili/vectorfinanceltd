import { backEndUrl } from "@/Constants"
  
const DisplaySignature = (props) => {
        const witnessSignature = props.witnessSignature
        const directorSignature = props.directorSignature
        const ceoSignature = props.ceoSignature
        const signature = props.signature
        
        // console.log("witnessSignature",witnessSignature)
        // console.log("signature",signature)
        // console.log("directorSignature",directorSignature)
        // console.log("ceoSignature",ceoSignature)

        async function getBase64Image(url) {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`)
            }
            const blob = await response.blob()
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
            })
        }

        async function loadImage() {
            try {
            // Use the Base64 image as the source for an <img> element
            if(props.for === "witness"){
                document.getElementById('witness-image').src = await getBase64Image(backEndUrl + witnessSignature.url)
            }
            else if(props.for === "director"){
                document.getElementById('director-image').src = await getBase64Image(backEndUrl + directorSignature.url)
            }
            else if(props.for === "ceo"){
                document.getElementById('ceo-image').src = await getBase64Image(backEndUrl + ceoSignature.url)
            }
            else{
                document.getElementById('image').src = await getBase64Image(backEndUrl + signature.url)
            }
            } catch (error) {
                console.error('Error fetching image:', error)
            }
        }
      
        loadImage()

        if(props.for === "witness"){
            return (
                witnessSignature? <div style={{ textAlign: 'left', width: '100%' , margin:'0 auto'}}>
                <h6 style={{textAlign:'left'}}>Signature: </h6>
                <img id="witness-image" alt="Signature" /> {/* because i am using a blob method */}
                </div> : <></>
            )
        }
        if(props.for === "director"){
            return (
                directorSignature? <div style={{ textAlign: 'left', width: '100%' , margin:'0 auto'}}>
                <h6 style={{textAlign:'left'}}>Signature: </h6>
                <img id="director-image" alt="Signature" /> {/* because i am using a blob method */}
                </div> : <></>
            )
        }
        if(props.for === "ceo"){
            return (
                ceoSignature? <div style={{ textAlign: 'left', width: '100%' , margin:'0 auto'}}>
                <h6 style={{textAlign:'left'}}>Signature: </h6>
                <img id="ceo-image" alt="Signature" /> {/* because i am using a blob method */}
                </div> : <></>
            )
        }
        return (
            signature? <div style={{ textAlign: 'left', width: '100%' , margin:'0 auto'}}>
            <h6 style={{textAlign:'left'}}>Signature: </h6>
            <img id="image" alt="Signature" /> {/* because i am using a blob method */}
            </div> : <></>
        )
}

export default DisplaySignature