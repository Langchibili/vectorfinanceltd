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
  /*liveserver: */ backendUrl =  apiurl.replace('api.vectorfinancelimited.com/api','api.vectorfinancelimited.com') // for production's sake
 }
 else if(environment === 'live2'){
  /*liveserver: */ backendUrl =  apiurl.replace('api.vectorfinancelimited.app/api','api.vectorfinancelimited.app') // for production's sake
 }
 else{ // if environment is default, it means it's a test server
  /*testserver: */ backendUrl =  apiurl.replace('testapi.vectorfinancelimitedap.com/api','api.vectorfinancelimitedapi.com') // the api to be used when deployed to the test site
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
