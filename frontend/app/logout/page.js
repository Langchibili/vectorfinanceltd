"use client"

import { useEffect } from "react"
import { isNative, request } from "@/lib/nativeBridge"

export default function logout({searchParams}) {
    useEffect(() => {
      if (searchParams && typeof window !== "undefined") {
         const {ref} = searchParams
         const finishLogout = () => {
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

        if (isNative()) {
           request("STOP_SERVICES")
             .catch((error) => console.error("Could not stop native services during logout", error))
             .finally(finishLogout)
        } else {
           finishLogout()
        }
      }
    },[searchParams])
    
    return <></>
}