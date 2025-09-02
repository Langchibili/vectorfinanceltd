// "use client"

// import { useEffect } from "react"

// export default function logout({searchParams}) {
//     useEffect(()=>{
//       if(searchParams){
//          const {ref} = searchParams
//          if(typeof window !== "undefined"){
//             localStorage.removeItem('jwt')
//             window.location = ref === "admin"? "/admin" : "/"
//         }
//       }
//     },[searchParams])
    
//     return <></>
// }

"use client"

import { useEffect } from "react"

export default function logout({searchParams}) {
    useEffect(()=>{
      if(searchParams){
         const {ref} = searchParams
         if(typeof window !== "undefined"){
            // Clear all localStorage and sessionStorage
            localStorage.clear();
            sessionStorage.clear();

            // Optionally, clear cookies (basic approach)
            document.cookie.split(";").forEach((c) => {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            window.location = ref === "admin"? "/admin" : "/"
        }
      }
    },[searchParams])
    
    return <></>
}