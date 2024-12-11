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
  if(typeof window !== undefined){
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

export const simpleInterestLoanCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
  const calculateTotalInterest = (amount, monthlyInterest, months) => {
    return (parseFloat(amount) * monthlyInterest * months) / 100;
  };

  const calculateTotalPayment = (loanAmount, totalInterest) => {
    return parseFloat(loanAmount) + parseFloat(totalInterest);
  };

  const totalInterest = calculateTotalInterest(loanAmount, monthlyInterestRate, loanTermMonths);
  const totalPayment = calculateTotalPayment(loanAmount, totalInterest);
  const monthlyPayment = totalPayment / loanTermMonths;

  return {
    totalInterest: parseFloat(totalInterest).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2),
    monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
  };
};





export const loanAmortizationCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
  const calculateMonthlyPayment = (amount, monthlyInterest, months) => {
    return (
      (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
      (Math.pow(1 + monthlyInterest, months) - 1)
    );
  };

  const calculateTotalPayment = (monthlyPayment, months) => {
    return monthlyPayment * months;
  };

  const calculateProfit = (totalPayment, loanAmount) => {
    return totalPayment - loanAmount;
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyInterestRate / 100, loanTermMonths);
  const totalPayment = calculateTotalPayment(monthlyPayment, loanTermMonths);
  const totalProfit = calculateProfit(totalPayment, loanAmount);

  return {
    monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
    totalProfit: parseFloat(totalProfit).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2),
  };
};


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

export const getPosts = async (customUri=null,getMeta=false)=>{
  console.log(customUri)
  let posts = null
  if(customUri){
    posts = await fetch(customUri,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  else{
    posts = await fetch(api_url+'/posts',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
  if(!posts || !posts.data){
    return posts
  }
  if(getMeta){
    return posts
  }
  return posts.data
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

  export const getPostsByType = async (posttype,mediaOnly=false,populateString="")=>{
    let populate = '&populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    let requestUri = api_url+'/contents/?type='+posttype+populate
    if(mediaOnly){
      requestUri = api_url+'/contents/?type='+posttype+"&mediaOnly=true"+populate
    }
    const posts = await fetch(requestUri,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(posts){
           return posts
        }
        return null
  }

  export const getPostsBySeachAndType = async (search,posttype="all",mediaOnly=false,populateString="")=>{
    let populate = '&populate='+populateString
    if(populateString.length === 0){
       populate = "" // it means populate nothing
    }
    let requestUri =  requestUri = api_url+'/contents/?type='+posttype+"&search="+search+populate
    if(mediaOnly){
     requestUri = api_url+'/contents/?type='+posttype+"&search="+search+"&mediaOnly=true"+populate    
    }
    const posts = await fetch(requestUri,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
         
        if(posts){
           return posts
        }
        return null
  }

  export const getPostUser = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=user,user.details',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with user',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.user){
        post.data.attributes.user.data.attributes.id = post.data.attributes.user.data.id  // put the id inside the attributes object to reflect the way the logged in user object looks
        return post.data.attributes.user.data.attributes
      }
      return null
  }

  export const getPostEngagement = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=engagements',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with engagement',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.engagements){
        return post.data.attributes.engagements.data
     }
      return null
  }

  export const getPostComments = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=comments',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with comments',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.comments){
        return post.data.attributes.comments.data
     }
      return null
  }

  export const getPostMedia = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=media',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with media',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.media){
         return post.data.attributes.media.data
      }
      return null
  }

  export const getPostfeaturedImages = async (title)=>{
    const postid = getIDFromDashedString(title)
    const post = await fetch(api_url+'/posts/'+postid+'?populate=featuredImages',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      log('this is a post with feauted images',post)
      
      if(post && post.data && post.data.attributes && post.data.attributes.featuredImages){
        return post.data.attributes.featuredImages.data
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

export const getVideoMetaFromPostAndId = (post,videoId)=>{
  if(!post.extra_payload){
      return null
  }
  else{
     if(!post.extra_payload.media){
        return null
     }
     else{
       if(!post.extra_payload.media.videos){
          return null
       }
       else{
         return !post.extra_payload.media.videos[videoId]? null : post.extra_payload.media.videos[videoId]
       }
     }
  }
}
 //  logging and deleting an engagement to a post, like a like or view 

  const engagementMappings = {
    likes: {
        action: 'likedPosts',
        idArray: 'likedPostsIds',
        postBy: 'postLikedBy'
    },
    shares: {
        action: 'sharedPosts',
        idArray: 'sharedPostsIds',
        postBy: 'postSharedBy'
    },
    views: {
        action: 'viewedPosts',
        idArray: 'viewedPostsIds',
        postBy: 'postViewedBy'
    },
    plays: {
        action: 'playedPosts',
        idArray: 'playedPostsIds',
        postBy: 'postPlayedBy'
    },
    impressions: {
        action: 'seenPosts',
        idArray: 'seenPostsIds',
        postBy: 'postSeenBy'
    }
};


export const logEngagement = async (type, postId, loggedInUser, ctx,createNotification=()=>{})=> {
    const { action, idArray, postBy } = engagementMappings[type];

    let userEngagementIds = ctx.state.loggedInUser.user[idArray] || [];
    
    if (!userEngagementIds.includes(postId)) {
        userEngagementIds.push(postId);
    }

    const updateUserObject = {
        [action]: { connect: [postId] },
        [idArray]: userEngagementIds
    };
    console.log('the engagement object',updateUserObject)
    const response = await fetch(`${api_url}/users/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUserObject)
    }).then(response => response.json());

    if (response) {
        const postEngagements = parseInt(ctx.state.post[type] || 0);
        const updatePostObject = {
            data: {
                [postBy]: { connect: [loggedInUser.id] },
                [type]: postEngagements + 1
            }
        };
        const response2 = await fetch(`${api_url}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePostObject)
        }).then(response => response.json());
        if (response2) {
            if(type === "likes" || type === "shares"){
                createNotification() // send notification to respective parties
            }
            ctx.setState(prevState => {
                return {
                    ...prevState,
                    loggedInUser: {
                        ...prevState.loggedInUser,
                        user: {
                            ...prevState.loggedInUser.user,
                            [idArray]: response[idArray]
                        }
                    },
                    post: {
                        ...prevState.post,
                        [type]: postEngagements + 1
                    },
                    requesting: false
                };
            });
        }
    }
}

export const deleteEngagement = async (type, postId, loggedInUser, ctx)=> {
    const { action, idArray, postBy } = engagementMappings[type];

    let userEngagementIds = ctx.state.loggedInUser.user[idArray] || [];

    userEngagementIds = userEngagementIds.filter(id => id !== postId);

    const updateUserObject = {
        [action]: { disconnect: [postId] },
        [idArray]: userEngagementIds
    };

    const response = await fetch(`${api_url}/users/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUserObject)
    }).then(response => response.json());

    if (response) {
        const postEngagements = parseInt(ctx.state.post[type] || 1)
        const updatePostObject = {
            data: {
                [postBy]: { disconnect: [loggedInUser.id] },
                [type]: postEngagements - 1
            }
        };

        const response2 = await fetch(`${api_url}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePostObject)
        }).then(response => response.json());
        if (response2) {
            ctx.setState(prevState => {
                return {
                    ...prevState,
                    loggedInUser: {
                        ...prevState.loggedInUser,
                        user: {
                            ...prevState.loggedInUser.user,
                            [idArray]: response[idArray]
                        }
                    },
                    post: {
                        ...prevState.post,
                        [type]: postEngagements - 1
                    },
                    requesting: false
                }
            })
        }
    }
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