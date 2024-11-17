import { returnNineDigitNumber } from '@/Functions';
import { LencoPubKey } from '@/Secrets'
import { CreditCard } from '@material-ui/icons';
import React, { useEffect } from 'react'

const LencoPaymentButton = (props) => {
  const mobileNumber = props.phoneNumber
  const paymentMethod = props.paymentMethod
  const email = props.loggedInUser.email
  const amount = parseFloat(props.paymentAmount).toFixed(2)
  const { details } = props.loggedInUser
  const { currentLoan } = props.loggedInUser

  console.log(props)
 
  useEffect(() => {
    // Load the LencoPay script
    const script = document.createElement('script')
    script.src = 'https://pay.lenco.co/js/v1/inline.js'
    script.async = true
    document.body.appendChild(script)

    // Clean up the script on component unmount
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const getPaidWithLenco = () => {
    if(!currentLoan){
      return
    }
    if (window.LencoPay){
      console.log('ref-id-'+ currentLoan.id +"-0"+returnNineDigitNumber(mobileNumber)+ "-"+ Date.now()+"-amt-"+amount)
      window.LencoPay.getPaid({
        key: LencoPubKey, // Replace with your Lenco public key
        reference: 'ref-id-'+ currentLoan.id +"-0"+returnNineDigitNumber(mobileNumber)+ "-"+ Date.now()+"-amt-"+amount, // Unique reference
        email: email, // Customer's email
        amount:  amount, // Payment amount
        currency: "ZMW",
        channels: paymentMethod,
        customer: {
          firstName: details?.firstname || 'unknown client',
          lastName: details?.lastname || '',
          phone: "0"+returnNineDigitNumber(mobileNumber)
        },
        onSuccess: function (response) {
          const reference = response.reference
          window.location = "/"
          // Optionally: Call your backend with the payment reference to verify the payment
        },
        onClose: function () {
          alert('Payment was not completed, window closed.')
        },
        onConfirmationPending: function () {
          alert('We will redirect you when the payment is confirmed')
        },
      })
    } else{
      console.error("LencoPay script not loaded")
    }
  }

  return (
    <button
    style={{
        backgroundColor: props.disabled? 'gray' : '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, transform 0.2s ease'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = props.disabled? 'gray' : '#218838'
        e.currentTarget.style.transform = 'scale(1.05)'
    }}
    onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = props.disabled? 'gray' : '#28a745'
        e.currentTarget.style.transform = 'scale(1)'
    }}
    onClick={getPaidWithLenco}
    disabled={props.disabled}
    >
    <CreditCard/>
      Pay Now
</button>
  )
}

export default LencoPaymentButton
