import React from 'react';
import Alert from '@mui/material/Alert'; 
import { CopyAll, KeyboardDoubleArrowDown, WhatsApp } from '@mui/icons-material';
import { Button } from '@mui/material';

export default class CopyAndWhatsAppButtons extends React.Component{
    componentDidMount(){
      // Get references to the button and the text to copy
      /*const copyButton = document.getElementById("copyButton");*/
      const whatsappButton = document.getElementById("whatsappButton");
      const numberToCopy = document.getElementById("copyNumber");
      
      /*
      copyButton.addEventListener("click", function() {
          // Create a temporary textarea element to hold the text
          const tempTextArea = document.createElement("textarea");
          tempTextArea.value = numberToCopy.textContent;
  
          // Append the textarea to the document
          document.body.appendChild(tempTextArea);
  
          // Select the text inside the textarea
          tempTextArea.select();
  
          // Copy the selected text to the clipboard
          document.execCommand("copy");
  
          // Remove the temporary textarea from the document
          document.body.removeChild(tempTextArea);
  
          // Change the button text to indicate successful copying
          copyButton.textContent = "Copied!";
      }
      */
  
      // Add a click event listener to the button
      whatsappButton.addEventListener("click", function() {
        // Get the phone number text from the page
        const number = numberToCopy.textContent;
  
        // Construct the WhatsApp URL with the phone number
        const whatsappUrl = `https://wa.me/${number}`;
  
        // Open a new window/tab with the WhatsApp URL
        window.open(whatsappUrl);
      })
  
    }
    render(){
      return (
             <>
             <Alert severity="info">{this.props.info}</Alert>
             <div style={{maxWidth:100,textAlign:'center',margin:'auto'}}><KeyboardDoubleArrowDown sx={{opacity:0.6}} color='success'/></div>
             <div style={{width:'100%',margin:"0 auto",textAlign:"center"}}>
                <Button sx={{marginBottom:2,fontWeight:900}} variant="outlined" id="whatsappButton" color="success"><WhatsApp sx={{marginRight:1}}/>{this.props.buttonText}</Button>
                {/*<Button id="copyButton"><CopyAll/> Copy Number</Button>*/}
              </div>
              </>
              )
    }
  }
  
  