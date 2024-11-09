import { returnNineDigitNumber } from '@/Functions';
import { LencoPubKey } from '@/Secrets'
import React, { useEffect } from 'react'

const LencoPaymentButton = (props) => {
  const mobileNumber = props.loggedInUser.username
  const email = props.loggedInUser.email
  const amount = props.amount
  const { details } = props.loggedInUser;
  const { currentLoan } = props.loggedInUser;


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
    if (window.LencoPay) {
      console.log('ref-id-'+ currentLoan.id +"-0"+returnNineDigitNumber(mobileNumber)+ "-"+ Date.now())
      window.LencoPay.getPaid({
        key: LencoPubKey, // Replace with your Lenco public key
        reference: 'ref-id-'+ currentLoan.id +"-0"+returnNineDigitNumber(mobileNumber)+ "-"+ Date.now(), // Unique reference
        email: email, // Customer's email
        amount: amount, // Payment amount
        currency: "ZMW",
        channels: ["card", "mobile-money"],
        customer: {
          firstName: details?.firstname || 'unknown client',
          lastName: details?.lastname || '',
          phone: "0"+returnNineDigitNumber(mobileNumber),
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
    } else {
      console.error("LencoPay script not loaded")
    }
  }

  return (
    <button className='btn btn-success mt-20' onClick={getPaidWithLenco}>
      Mobile Money and Card Payments
    </button>
  )
}

export default LencoPaymentButton
