// "use client";

// import { Slide } from "@material-ui/core";
// import React from "react";

// export default class HelpPageDisplay extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     }
//   }

//   async componentDidMount() {

//   }
//   render() {
//     return <Slide in={true} direction="left">
//           <iframe id="help-page-iframe" src="https://vectorfinancelimited.com/contact-us/" title="Full Page Iframe"></iframe>
//     </Slide>;
//   }
// }
// //  id
// //  sign a letter of sale
import CopyAndWhatsAppButtons from '@/components/Includes/CopyAndWhatsAppButtons/CopyAndWhatsAppButtons';
import { Info } from '@mui/icons-material';

export default function HelpPageDisplay() {
    return (
    <>
    <div style={{width:'100%',margin:'0 auto',textAlign:'center'}}>
    <div><a href='https://vectorfinancelimited.com/contact-us/' target='_blank'  style={{display:'inline-block', width:'50%', margin:'10px auto 0 auto', padding:5,border:'1px solid blue', borderRadius:4, color:'blue'}}><Info color='info'/> See Our Contact Details </a></div>  
    </div>
    <br/>
    <CopyAndWhatsAppButtons buttonText="Text Us On WhatsApp" info={<>To get help or ask anything about our app, please send a whatsapp message to this number: <strong><span id="copyNumber">+260979460045</span></strong></>}/>
    <div style={{width:'100%',margin:'0 auto',textAlign:'center'}}>
    if we delay the response
    make a direct call to this number 
    <em> 0979460045</em>
    </div>
    </>
  )
}