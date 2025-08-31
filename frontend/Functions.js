'use client'

// UTILITY FUNCTIONS

import { api_url, backEndUrl, getJwt, log } from "./Constants"
import { getJWT } from "./Secrets";

export const returnNineDigitNumber = (phoneNumber) =>{
    // Remove any non-digit characters
    let normalizedNumber = phoneNumber.replace(/\D/g, '')
  
    // Extract the last nine digits
    return normalizedNumber.slice(-9)
}

export const textHasPhoneNumber = (text)=>{
  // Regular expression to match sequences of digits that are 8 characters or longer
  const phoneNumberRegex = /[0-9]{9,}/;
  // Use the test method to check if the text contains a phone number
  return phoneNumberRegex.test(text);
} 

// Utility to convert numbers up to 9999 into English words
function numberToWords(num) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
  const teens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  
  function underThousand(n) {
    let words = "";
    if (n >= 100) {
      words += ones[Math.floor(n/100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 10 && n < 20) {
      words += teens[n-10] + " ";
    } else if (n >= 20) {
      words += tens[Math.floor(n/10)] + " ";
      n %= 10;
    }
    if (n > 0 && n < 10) {
      words += ones[n] + " ";
    }
    return words.trim();
  }

  let result = "";
  if (num >= 1000) {
    result += underThousand(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (num > 0) {
    result += underThousand(num);
  }
  return result.trim();
}

// Returns the current day of month
export function getAgreementDay() {
  return new Date().getDate();
}

// Returns the current day of month
export function getAgreementDaySuffix() {
  const day = new Date().getDate();
  // Determine suffix
  const tens = day % 100;
  let suffix = "th";
  if (tens < 11 || tens > 13) {
    switch (day % 10) {
      case 1: suffix = "st"; break;
      case 2: suffix = "nd"; break;
      case 3: suffix = "rd"; break;
    }
  }
  return suffix
}

export function getAgreementYearNumber() {
  return new Date().getFullYear().toString();
}

// Returns the full month name, e.g. "June"
export function getAgreementMonth() {
  return new Date().toLocaleString("en-US", { month: "long" });
}

// Returns the current year in words, e.g. "Two Thousand Twenty-Five"
export function getAgreementYearWords() {
  return numberToWords(new Date().getFullYear());
}

// Converts 0–999 to words
function threeDigitToWords(num) {
  const ones = ["","one","two","three","four","five","six","seven","eight","nine"];
  const teens = ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

  let word = "";

  const hundred = Math.floor(num / 100);
  const rest = num % 100;

  if (hundred) {
    word += ones[hundred] + " hundred";
    if (rest) word += " ";
  }

  if (rest >= 10 && rest < 20) {
    word += teens[rest - 10];
  } else {
    const ten = Math.floor(rest / 10);
    const one = rest % 10;
    if (ten) {
      word += tens[ten];
      if (one) word += "-";
    }
    if (one) {
      word += ones[one];
    }
  }

  return word;
}

// Main number converter
export function naturalNumberToWords(input) {
  if (input === null || input === undefined) return "";
  const num = Number(input);
  if (isNaN(num)) return "";

  if (num === 0) return "zero";

  const scales = [
    { value: 1e12, name: "trillion" },
    { value: 1e9,  name: "billion"  },
    { value: 1e6,  name: "million"  },
    { value: 1e3,  name: "thousand" },
    { value: 1,    name: ""         }
  ];

  let [intPart, decPart] = num.toString().split(".");
  let n = parseInt(intPart, 10);

  let words = [];

  for (let { value, name } of scales) {
    if (n >= value) {
      const count = Math.floor(n / value);
      n -= count * value;
      const chunk = threeDigitToWords(count);
      words.push(chunk + (name ? " " + name : ""));
    }
  }

  let result = words.join(" ").trim();

  // handle decimal part if present
  if (decPart) {
    result += " point";
    for (let digit of decPart) {
      result += " " + ["zero","one","two","three","four","five","six","seven","eight","nine"][+digit];
    }
  }

  return result;
}


const formatDate = (date) => {
  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
  
  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export const dateAndTimeNow = ()=>{
   //  const now = new Date().toISOString();
   //const now = new Date();
   //return formatDate(now).replace('/','-').replace('/','-');
   return Date.now()
   //return formatDate(now);
}

// export const createYouTubeEmbedLink = (url)=>{
//   // Regular expression to match different YouTube URL formats
//   const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|playlist\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

//   // Extract the VIDEO_ID from the URL
//   const match = url.match(regex);

//   // If there's a match, return the embed URL, otherwise return null or handle invalid URLs
//   if (match && match[1]) {
//     const videoId = match[1];
//     return `https://www.youtube.com/embed/${videoId}`;
//   } else {
//     return null; // Or handle invalid YouTube URLs as needed
//   }
// }

// // Example usage:
// const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
// const embedLink = createYouTubeEmbedLink(youtubeUrl);
// log(embedLink); // Outputs: https://www.youtube.com/embed/dQw4w9WgXcQ

export const validateUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;

  if (!url || url.length === 0) {
      return null // for now it means no error
      // return 'URL cannot be empty.' // Optional: Check for empty input
  }

  if (!urlRegex.test(url)) {
    console.log(url)
      return 'Please enter a valid URL.'; // Error message for invalid URL
  }

  return null; // No error
}

const getIDFromDashedString = (dashed_title)=>{
    const parts = dashed_title.split('-')
    return parts[parts.length - 1]
}
export const generateDashedString = (str)=> {
  // Trim the string to 100 characters if it's longer
  let trimmedStr = str.length > 100 ? str.substring(0, 100) : str;
  // Replace spaces with dashes and return the result
  return trimmedStr.trim().replace(/\s+/g, '-');
}

export const generateUniqueText = ()=>{
    const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
    const randomPart = Math.random().toString(36).substr(2, 9); // Random base-36 string
    return `untitled${timestamp}-${randomPart}`;
}

export const removeIdFromArray = (arr,id)=>{
    // Find the index of the element you want to remove
    let index = arr.indexOf(id);
    // Check if the element is found
    if (index !== -1) {
        // Remove the element at the found index
        arr.splice(index, 1);
    }
    return arr
}

export const scrolltoTopOFPage = ()=>{
  if(typeof window !== "undefined"){
      window.scrollTo({
          top: 0,
          behavior: 'smooth' // Enables smooth scrolling
        })
  }
}

export const dynamicConfig = (config="auto")=>{
    return config
}

export const handleCountsDisplay = (counts) => { // formating counts like: likes, views, shares, etc
    if(counts === null) return "0"
    if (parseInt(counts) >= 1_000_000_000) {
      return (parseInt(counts) / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + 'B'
    } else if (parseInt(counts) >= 1_000_000) {
      return (parseInt(counts) / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M'
    } else if (parseInt(counts) >= 1_000) {
      return (parseInt(counts) / 1_000).toFixed(2).replace(/\.00$/, '') + 'K'
    } else {
      return counts.toString()
    }
  }

  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

 export const truncateText = (text, maxLength)=> {
    if(!text){
      return ''
    }
    // Check if the text length exceeds the specified maxLength
    if (text.length > maxLength) {
        // Cut the text to the maxLength, subtracting 3 to account for the "..."
        return text.slice(0, maxLength - 3) + "...";
    }
    // If the text is within the limit, return it as is
    return text;
}


function simpleInterestLoanCalculator({ principal, ratePercent, termMonths }) {
  const totalInterest = (principal * ratePercent * termMonths) / 100
  const totalPayment = principal + totalInterest
  const monthlyPayment = totalPayment / termMonths

  return {
    totalInterest: parseFloat(totalInterest).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2),
    monthlyPayment: parseFloat(monthlyPayment).toFixed(2)
  }
}

/**
 * Pure compound interest (no amortization)
 */
function compoundInterest({ principal, ratePercent, termPeriods }) {
  const r = ratePercent / 100
  const n = termPeriods
  const totalPayment = principal * Math.pow(1 + r, n)
  const totalInterest = totalPayment - principal

  return {
    totalInterest: parseFloat(totalInterest).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2)
  }
}

/**
 * Amortization schedule calculator
 */
function loanAmortizationCalculator({ principal, annualRatePercent, termMonths, periodsPerYear = 12 }) {
  const r = annualRatePercent / 100 / periodsPerYear
  const n = termMonths
  const payment =
    (principal * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1)
  const totalPayment = payment * n
  const totalInterest = totalPayment - principal
  return {
    monthlyPayment: parseFloat(payment).toFixed(2),
    totalInterest: parseFloat(totalInterest).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2)
  }
}

export const calculateLoan  = async ({ amount, loanType, termMonths = null })=> {
  const settings = await getLoansInformation()
  const isSalary = loanType === 'salaryBased'
  const defaultRate = isSalary
    ? settings.defaultSalaryLoanInterestRate
    : settings.defaultCollaterallLoanInterestRate
  const defaultTerm = isSalary
    ? settings.defaultSalaryLoanTerm
    : settings.defaultCollaterallLoanTerm
  const term = termMonths || defaultTerm

  const interestType = isSalary
    ? settings.salaryLoanInterestType || 'amortization'
    : settings.collateralLoanInterestType || 'simple'
  const interestCalc = isSalary
    ? settings.SalaryLoanInterestCalculation || 'monthly'
    : settings.collateralLoanInterestCalculation || 'monthly'

  if (interestType === 'simple') {
    const ratePerPeriod = interestCalc === 'monthly' ? defaultRate : defaultRate / 12
    return simpleInterestLoanCalculator({ principal: amount, ratePercent: ratePerPeriod, termMonths: term })
  }

  if (interestType === 'amortization') {
    const annualRate = interestCalc === 'annually' ? defaultRate : defaultRate * 12
    return loanAmortizationCalculator({ principal: amount, annualRatePercent: annualRate, termMonths: term })
  }
  const ratePerPeriod = interestCalc === 'monthly' ? defaultRate : defaultRate / 12
  return compoundInterest({ principal: amount, ratePercent: ratePerPeriod, termPeriods: term })
}

export const getImage = (image, size = "normal", use = "normal") => {
    // Default URLs for profile pictures and cover photos
    const defaultProfilePicture = "/default-profile.png"
    const defaultCoverPhoto = "/no-cover-photo.jpg"

    // Check if the image object is valid and contains necessary attributes
    if (!image) {
        // If the image is not provided, return the appropriate default image based on the usage context
        return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
    }

    // Handle the first format where the image object contains 'attributes' property
    let formats, defaultUrl;
    if (image.attributes) {
        formats = image.attributes.formats;
        defaultUrl = image.attributes.url || null;
    } else {
        // Handle the second format where the image object directly contains the necessary properties
        formats = image.formats;
        defaultUrl = image.url || null;
    }

    // Ensure formats exist before proceeding
    if (!formats) {
        return use === "profilePicture" ? defaultProfilePicture : defaultCoverPhoto;
    }

    // Return the appropriate image URL based on the requested size
    switch (size) {
        case "thumbnail":
            return formats.thumbnail?.url ? backEndUrl + formats.thumbnail.url : backEndUrl + defaultUrl;
        case "small":
            return formats.small?.url ? backEndUrl + formats.small.url : backEndUrl + defaultUrl;
        case "medium":
            return formats.medium?.url ? backEndUrl + formats.medium.url : backEndUrl + defaultUrl;
        case "large":
            return formats.large?.url ? backEndUrl + formats.large.url : backEndUrl + defaultUrl;
        default:
            return backEndUrl + defaultUrl;
    }
}

export const saveReferralCode = ()=>{
  // Only run in the browser
  if (typeof window === 'undefined') return null

  // Parse ?code=... from URL
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (!code) return null
  localStorage.setItem("referralCode",code)
}

export const getReferrerFromReferralCode = async (code) => {
  if (!code) return null
  try {
    // Fetch referral record filtered by its code, populating the user relation
    const url = `${api_url}/referrals` +
      `?filters[referralCode][$eq]=${encodeURIComponent(code)}` +
      `&populate=user`
    
    const response = await fetch(url, {
      headers: { 
        'Content-Type': 'application/json'
       }
    })
    const json = await response.json()
    const entry = json.data?.[0]
    if (!entry) return null

    // entry.attributes.user.data is the full user object
    return entry.attributes.user.data || null
  } catch (err) {
    console.error('Error fetching referrer by code:', err)
    return null
  }
}


export const getContentCount = async ({
  contentName,
  contentToFilterById = null,
  idField = "user",
  status = "published",
  orderByFieldName = "id",
  orderType = "desc",
}) => {
  try {
      // Construct the base URL
      let url = `${api_url}/${contentName}?pagination[limit]=0&pagination[withCount]=true&sort=${orderByFieldName}:${orderType}`

      // Add filtering for contentToFilterById if provided
      if (contentToFilterById) {
          url += `&filters[${idField}][id][$eq]=${contentToFilterById}`
      }

      // Add status filter only if the content is 'posts'
      if (contentName === "posts" && status) {
          url += `&filters[status][$eq]=${status}`
      }

      // Fetch the data
      const response = await fetch(url, {
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${getJwt()}`
          },
      })

      const data = await response.json()

      // Return the count if meta and pagination exist
      if (data?.meta?.pagination) {
          return data.meta.pagination.total
      }
      if(data){
        return data.length
      }
      // Fallback if count is not available
      return null
  } catch (error) {
      console.error("Error fetching content count:", error)
      return null
  }
}

  
 
  export const updateUserAccount = async (updateObject,userId,customJwt=null)=>{
    console.log(updateObject)
    const jwt = customJwt || getJwt()
    return await fetch(api_url+'/users/'+userId, {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${jwt}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateObject),
    })
    .then(response => response.json())
    .then(data => data)
  }

//   export async function getAllLoans(page) {
//     try {
//       const loans = await fetch(api_url+'/loans?sort=id:desc', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${getJwt()}`,
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => response.json())
//       .then(data => data)
//       if(loans && loans.data){
//         return loans.data
//       }
//       return []
//     } catch (err) {
//       console.error('getAllLoans error:', err)
//       return []
//     }
// }

export async function getAllLoans(page = 1, pageSize = 10) {
  try {
    const loans = await fetch(
      `${api_url}/loans?sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => data)
    if (loans && loans.data) {
      return {
        data: loans.data,
        meta: loans.meta?.pagination || { page: 1, pageCount: 1 }
      }
    }
    return { data: [], meta: { page: 1, pageCount: 1 } }
  } catch (err) {
    console.error('getAllLoans error:', err)
    return { data: [], meta: { page: 1, pageCount: 1 } }
  }
}

export const getAllUsers = async ({ search = '', page = 1 }) => {
  // Example API call, adjust endpoint and params as needed
  let url = `${api_url}/users?page=${page}`
  if (search) {
    url += `&search=${encodeURIComponent(search)}`
  }
  console.log('search',url)
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch users')
  const users = await res.json()
  return {
    users: users || [],
    totalPages: users.totalPages || 1
  }
}
  
  export const pushUserIntoLoanClientsList = async (createObject)=>{
    return await fetch(api_url+'/loans-clients', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(createObject),
    })
    .then(response => response.json())
    .then(data => data)
  }

  export const pushUserIntoInvestmentClientsList = async (createObject)=>{
    return await fetch(api_url+'/investment-clients', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(createObject),
    })
    .then(response => response.json())
    .then(data => data)
  }
  
// REFERRAL STUFF
export const createReferralAccount = async (userId)=>{
    const referralAccount = await fetch(api_url+'/referrals/', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:{referralCode:"ref"+userId}}),
    })
    .then(response => response.json())
    .then(data => data)
    if(referralAccount && referralAccount.data && referralAccount.data.attributes){
        updateUserAccount({referral: referralAccount.data.id},userId)
     }
}

export const getReferralsById = async (referralId,populateString="")=>{
    let populate = '?populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    const referral = await fetch(api_url+'/referrals/'+referralId+populate,{
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(referral && referral.data && referral.data.attributes){
           referral.data.attributes.id = referral.data.id
           return referral.data.attributes
        }
        return null
  }


  export const updateReferralCode = async (data,referralId)=>{
    const referral =  await fetch(api_url+'/referrals/'+referralId, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => data)
    if(referral && referral.data && referral.data.attributes){
        referral.data.attributes.id = referral.data.id
        return referral.data.attributes
    }
    if(referral && referral.error && referral.error.message === "This attribute must be unique"){
       return referral // expose the object with the error object inside it
    }
    return null
}



// LOAN FUNCTIONS

export const createNewLoan = async (data)=>{
    const loan =  await fetch(api_url+'/loans', {
        method: 'POST',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => data)
    if(loan && loan.data && loan.data.attributes){
        loan.data.attributes.id = loan.data.id
        return loan.data.attributes
     }
    return null
}

export const logNewTransactionHistory = async (data)=>{
  const transactionHistory =  await fetch(api_url+'/transaction-histories', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(transactionHistory && transactionHistory.data && transactionHistory.data.attributes){
      transactionHistory.data.attributes.id = transactionHistory.data.id
      return transactionHistory.data.attributes
   }
  return null
}

export const logNewNotification = async (data)=>{
  const notification =  await fetch(api_url+'/notifications', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(notification && notification.data && notification.data.attributes){
      notification.data.attributes.id = notification.data.id
      return notification.data.attributes
   }
  return null
}
export const logNewAdminNotification = async (data)=>{
  const notification =  await fetch(api_url+'/admin-notifications', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(notification && notification.data && notification.data.attributes){
      notification.data.attributes.id = notification.data.id
      return notification.data.attributes
   }
  return null
}


export const updateLoan = async (data,loanId)=>{
  const loan =  await fetch(api_url+'/loans/'+loanId, {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(loan && loan.data && loan.data.attributes){
      loan.data.attributes.id = loan.data.id
      return loan.data.attributes
   }
  return null
}

export const getPhoneNumbers = async ()=>{
  const phoneNumbers = await fetch(api_url+'/phone-numbers-list',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  if(phoneNumbers && phoneNumbers.data){
     return phoneNumbers.data.attributes
  }
 }
 
 export const getEmailAddresses = async ()=>{
  const emailAddresses = await fetch(api_url+'/email-addresses-list',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  if(emailAddresses && emailAddresses.data){
     return emailAddresses.data.attributes
  }
 }

 export const updatePhoneNumbers = async (data)=>{
  const loan =  await fetch(api_url+'/phone-numbers-list', {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
}

export const updateEmailAddresses = async (data)=>{
  const loan =  await fetch(api_url+'/email-addresses-list', {
      method: 'PUT',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
}
 
export const sendOTP = async (identifier,identifierType) => {
  // Make request to resend OTP
  fetch(api_url+'/auths?identifier='+identifier+'&auth_stage=sendotp&identifierType='+identifierType,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
}

export const checkClientIdStatus = async (idNumber,clientId) => {
  // Make request to resend OTP
    const clientIdStatus = await fetch(api_url+'/client-ids?idNumber='+idNumber+"&clientId="+clientId,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
     if(clientIdStatus && clientIdStatus.status) {
      return clientIdStatus.status
     }
}

export const getLoanCategoryIds = async ()=>{
  const loanCategories = await fetch(api_url+'/loan-categories',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  let loanCategoryIdsObject = {}  
  if(loanCategories && loanCategories.data){
    loanCategories.data.forEach(loanCategory => {
      loanCategoryIdsObject[loanCategory.attributes.categoryName] = loanCategory.id
    })
  }
  return loanCategoryIdsObject
 }
 
 export const getLoanTypesIds = async ()=>{
  const loanTypes = await fetch(api_url+'/types',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  let loanTypesIdsObject = {}  
  if(loanTypes && loanTypes.data){
    loanTypes.data.forEach(loanType => {
      loanTypesIdsObject[loanType.attributes.typeName] = loanType.id
    })
  }
  return loanTypesIdsObject
 }

 export const getLoansInformation = async ()=>{
  const loansInformation = await fetch(api_url+'/loans-information',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  if(loansInformation && loansInformation.data){
    return loansInformation.data.attributes
  }
  else{
    return loansInformation
  }
 }

 export const getAdminInitials = async ()=>{
  const adminInitials = await fetch(api_url+'/admin-initial?populate=*',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  if(adminInitials && adminInitials.data && adminInitials.data.attributes){
     const ceoFullNames  = adminInitials.data.attributes.ceoFullNames || null
     const directorFullNames = adminInitials.data.attributes.directorFullNames || null
     const directorInitials  = adminInitials.data.attributes.director?.data?.attributes || null
     const ceoInitials = adminInitials.data.attributes.ceo?.data?.attributes || null
     return {directorInitials,ceoInitials,ceoFullNames,directorFullNames}
  }
  else{
    return null
  }
 }
  export const getAdminSignature = async ()=>{
  const adminSignature = await fetch(api_url+'/admin-signature?populate=*',{
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
  if(adminSignature && adminSignature.data && adminSignature.data.attributes){
     const directorSignature  = adminSignature.data.attributes.director?.data?.attributes || null
     const ceoSignature = adminSignature.data.attributes.ceo?.data?.attributes || null
     return {directorSignature,ceoSignature}
  }
  else{
    return null
  }
 }

  export const getLoanFromId = async (loanid,populateString="")=>{
    let populate = '?populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    const loan = await fetch(api_url+'/loans/'+loanid+populate,{
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(loan && loan.data && loan.data.attributes){
           loan.data.attributes.id = loan.data.id
           return loan.data.attributes
        }
        return null
  }


export const getLoansFromClientId = async (clientId, populate = '') => {
  // Build the URL with basic filtering and sorting
  let url = `${api_url}/loans?filters[client][id][$eq]=${clientId}&sort=id:desc`
  if (populate) {
    url += `&populate=${populate}`
  }

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()

    if (json.data && Array.isArray(json.data)) {
      return json.data.map(item => {
        return { id: item.id, ...item.attributes }
      })
    }

    return []
  } catch (err) {
    console.error('Error fetching loans:', err)
    return []
  }
}

 export const getLoanRepaymentSchedule = async (loanId)=>{
    const schedule = await fetch(api_url+'/get-repayment-schedule?loanId='+loanId,{
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(schedule && schedule.data && schedule.data.attributes){
           return schedule.data.attributes.data
        }
        return null
  }

  // INVESTMENTS FUNCTIONS

export const createNewDraftInvestment = async (data)=>{
  const draftInvestment =  await fetch(api_url+'/investment-drafts', {
      method: 'POST',
      headers: {
       'Authorization': `Bearer ${getJwt()}`,
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => data)
  if(draftInvestment && draftInvestment.data && draftInvestment.data.attributes){
    draftInvestment.data.attributes.id = draftInvestment.data.id
      return draftInvestment.data.attributes
   }
  return null
}


 // uploads stuff
 
 export const getMediaFile = async (uploadId)=>{
  const upload = await fetch(api_url+'/upload/files/'+uploadId,{
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
    log('this is a post with media',post)
    
    if(upload && upload.data && upload.data.attributes && upload.data.attributes.media){
       return upload.data.attributes.media.data
    }
    return null
}

// USER FUNCTIONS

export const getUsers = async (customUri=null)=>{
  console.log(customUri)
  let users = null
  if(customUri){
    users = await fetch(customUri,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  else{
    users = await fetch(api_url+'/users',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  console.log(users)
  if(!users || !users.data){
    return users
  }
  return users
 }

export const getUserById = async (id,populateString="")=>{
    let populate = '?populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }

    const response = await fetch(api_url+'/users/'+id+populate,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        if(response){
           return response
        }
        return null
}


export const getUserFromDashedId = async (dashedId,populateString)=>{
    const userId = getIDFromDashedString(dashedId)
    return await getUserById(userId,populateString)
}

   export const getUserFromUsername = async (username, populateString)=>{
    const response = await fetch(api_url+'/auths?username='+username,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
    if(!response.hasOwnProperty('user')){
       return null
    }    
    return await getUserById(response.user.id,populateString)
   }



   // notifications logging

   export const logNotification = async(title,userId,notifiedUserIds,contentType="user",contentId="")=>{
       const notificationObject = {
          data:{
            title: title,
            notifier: {connect: [parseInt(userId)]},
            notifiedUsers: { connect: notifiedUserIds},
            type: contentType
          } 
       }
       console.log('inside notifications object',notificationObject)
       if(contentType === "post"){
           notificationObject.data.post = {connect: [parseInt(contentId)]}  
       }
       // if it is a user, then the activity logger is the user of interest
       await fetch(api_url+'/notifications', {
        method: 'POST',
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationObject),
      })
      .then(response => response.json())
      .then(data => data)
   }