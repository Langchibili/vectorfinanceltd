import { backEndUrl } from "@/Constants"
  
const DisplaySignature = (props) => {
        const witnessSignature = props.witnessSignature
        const signature = props.signature
        console.log(witnessSignature)
        console.log(signature)
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
            const base64Image = await getBase64Image(props.for === "witness"? backEndUrl + witnessSignature.url :  backEndUrl + signature.url)
            console.log(base64Image)
            // Use the Base64 image as the source for an <img> element
            if(props.for === "witness"){
                document.getElementById('witness-image').src = base64Image
            }
            else{
                document.getElementById('image').src = base64Image
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
                <img id="witness-image" alt="Loaded Base64 Image" /> {/* because i am using a blob method */}
                </div> : <></>
            )
        }
        return (
            signature? <div style={{ textAlign: 'left', width: '100%' , margin:'0 auto'}}>
            <h6 style={{textAlign:'left'}}>Signature: </h6>
            <img id="image" alt="Loaded Base64 Image" /> {/* because i am using a blob method */}
            </div> : <></>
        )
}

export default DisplaySignature
