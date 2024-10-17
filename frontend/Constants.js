'use client'

import { getJWT, saveJwt } from "./Secrets"

 /*localhost: */ export const environment = 'local'
 ///*liveserver1: */ export const environment = 'live'
 ///*liveserver2: */ export const environment = 'live2'
 ///*testserver: */ export const environment = 'test' // mvp will run here

// export the client side stuff

export const getJwt = getJWT

let apiurl, backendUrl, clienturl

 if(environment === 'local'){
   /*localhost: */  apiurl = 'http://localhost:1350/api'
 }
 else if(environment === 'live'){
   /*liveserver1: */ apiurl = 'https://api.vectorfinancelimited.com/api' // for production's sake
 }
 else if(environment === 'live2'){
  /*liveserver2: */ apiurl = 'https://api.vectorfinancelimited.app/api' // for production's sake
 }
 else{ // if environment is default, it means it's a test server
  /*testserver: */  apiurl = 'https://testapi.vectorfinancelimitedapi.com/api' // the api to be used when deployed to the test site
 }
// if(environment === 'local'){ // for testing on the phone
//   /*localhost: */  apiurl = 'http://192.168.27.143:1339/api'
// }


 // for removing the api part when handling /uploads and the like
 if(environment === 'local'){
  /*localhost: */  backendUrl = apiurl.replace('http://localhost:1350/api','http://localhost:1350')
 }
 else if(environment === 'live'){
  /*liveserver: */ backendUrl =  apiurl.replace('https://api.vectorfinancelimited.com/api','vectorfinancelimited.com') // for production's sake
 }
 else if(environment === 'live2'){
  /*liveserver: */ backendUrl =  apiurl.replace('https://api.vectorfinancelimited.app/api','vectorfinancelimited.app') // for production's sake
 }
 else{ // if environment is default, it means it's a test server
  /*testserver: */ backendUrl =  apiurl.replace('https://testapi.vectorfinancelimitedap.com/api','vectorfinancelimitedapi.com') // the api to be used when deployed to the test site
 }
 

if(environment === 'local'){
  /*localhost: */  clienturl = 'http://localhost:3002'
}
else if(environment === 'live'){
  /*liveserver1: */ clienturl = 'https://portal.vectorfinancelimited.com' // for production's sake
}
else if(environment === 'live2'){
   /*liveserver2: */ clienturl = 'https://portal.vectorfinancelimited.app' // for production's sake
}
else{ // if environment is default, it means it's a test server
  /*testserver: */  clienturl = 'https://portal.vectorfinancelimited.com' // the api to be used when deployed to the test site
}
 

 export let api_url = apiurl
 export let backEndUrl = backendUrl
 export let clientUrl = clienturl
 

 export function log(...args) {
    if (environment === "local") {
      console.log(...args)
    } else {
      return // Do nothing on live or test servers unless environment is set to local
      }
 }

export const getFeature = async (featureId)=>{
    const feature = await fetch(api_url+'/app-features/'+featureId,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      if(feature && feature.data && feature.data.attributes){
         return feature.data.attributes.status
      }
      return null
  }
 
  const getUserAccount = async (jwt)=>{
    return await fetch(api_url+'/users/me',{
     headers: {
       'Authorization': `Bearer ${jwt}`,
       'Content-Type': 'application/json'
     }
   }).then(response => response.json())
     .then(data => data)
     .catch(error => console.error(error))
 }
 
 const getUserAccountWithUsernameAndPassword = async (username,password)=>{
  const authObject = {
    identifier: username,
    password: password
  } 
  return await fetch(api_url+'/auth/local', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(authObject),
  })
  .then(response => response.json())
  .then(data => data)
}

 const checkIfUserWithUsernameExists = async (username)=>{
  const response = await fetch(api_url+'/auths?username='+username,{
   headers: {
     'Content-Type': 'application/json'
   }
 }).then(response => response.json())
   .then(data => data)
   .catch(error => console.error(error))

   if(response.hasOwnProperty('user')) { 
    return true 
   } // means a user with the username exists
   return false
}

export const checkUserLogginStatus = async () =>{
    let logginStatusObject = {
        user: null,
        status: false
    }
    const jwt = getJWT()
    if(!jwt){
        return logginStatusObject
    }
    else{
        const user = await fetch(api_url+'/users/me?populate=*', {
            headers: {
             'Authorization': `Bearer ${jwt}`,
             'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => data)
        logginStatusObject.user = user
        logginStatusObject.status = true    
    }
    return logginStatusObject
}

export const submitCreateUserRequest = async (registerObject)=>{
    return await fetch(api_url+'/auth/local/register', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerObject),
      })
      .then(response => response.json())
      .then(data => data)
  }

// const updateDefaultUserAccountToSignUp = async (username,password)=>{
//   const jwt = getJwt()
//   const user = await getUserAccount(jwt) // get the user account because you actually have the jwt
//   const updateObject = {
//     username: username,
//     email:user.email,
//     password: password,
//     type:'loggedin',
//     status: "published"
//   }
//   return await fetch(api_url+'/users/'+user.id, {
//     method: 'PUT',
//     headers: {
//      'Authorization': `Bearer ${jwt}`,
//      'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updateObject),
//   })
//   .then(response => response.json())
//   .then(data => data)
// }

// const updateDefaultUserAccountToLogOut = async ()=>{
//   let logOutStatus = false
//   const jwt = getJwt()
//   const user = await getUserAccount(jwt) // get the user account because you actually have the jwt
//   const response =  await fetch(api_url+'/users/'+user.id, {
//     method: 'PUT',
//     headers: {
//      'Authorization': `Bearer ${jwt}`,
//      'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({type:'default'}),
//   })
//   .then(response => response.json())
//   .then(data => data)
//   if(response.hasOwnProperty("username")){
//      logOutStatus = true
//   }
//   return logOutStatus
// }

// const updateDefaultUserAccountToLogIn = async (username,password)=>{
//   const jwt = getJwt()
//   const response = await getUserAccountWithUsernameAndPassword(username,password)
//   let returnObject = response
//   if(response.hasOwnProperty('jwt')){
//     localStorage.removeItem('jwt') // remove whatever existing jwt
//     saveJwt(response.jwt) // save new jwt
//     const userUpdated = await fetch(api_url+'/users/'+response.user.id, {
//       method: 'PUT',
//       headers: {
//        'Authorization': `Bearer ${jwt}`,
//        'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({type:'loggedin'}),
//     })
//     .then(response => response.json())
//     .then(data => data)
//     if(returnObject.hasOwnProperty("username")){
//       returnObject = userUpdated
//     }
//   }
//   return returnObject
// }

// export const signUserUp = async (type,username="",password="") => { // username and password only important if it's a local sign up
//   if(type === "local"){
//       const accountExists = await checkIfUserWithUsernameExists(username)  
//       if(accountExists){
//         return {
//           error:{
//               message: 'userExists'
//           }
//         }
//       }
//       else{
//          const updatedUserAccount = await updateDefaultUserAccountToSignUp(username,password)
//          if(updatedUserAccount.hasOwnProperty('error')){
//           return {
//             error:{
//                 message:  updatedUserAccount.error.message
//             }
//           }
//          }
//          window.location = "/" // means you are logged in
//       }
//     }
//     else if(type === "facebook"){

//     }
//     else if(type === 'google'){

//     }
// }

// export const logUserIn = async (type,username="",password="") =>{ // username and password only important if it's a local sign up
//   // you supply the username and password and we log you in
//   if(type === "local"){ 
//     return await updateDefaultUserAccountToLogIn(username,password)
//   }
//   else if(type === "facebook"){

//   }
//   else if(type === 'google'){

//   }
// }


// export const logUserOut = async ()=>{
//   return await updateDefaultUserAccountToLogOut()
// }

// const generateUniqueUsername = ()=>{
//   const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
//   const randomPart = Math.random().toString(36).substr(2, 9); // Random base-36 string
//   return `User${timestamp}-${randomPart}`;
// }



