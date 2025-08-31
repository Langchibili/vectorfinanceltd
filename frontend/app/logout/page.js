"use client"

import { useEffect } from "react"

export default function logout({searchParams}) {
    useEffect(()=>{
      if(searchParams){
         const {ref} = searchParams
         if(typeof window !== "undefined"){
            localStorage.removeItem('jwt')
            window.location = ref === "admin"? "/admin" : "/"
        }
      }
    },[searchParams])
    
    return <></>
}
