"use client"

export default function logout() {
    if(typeof window !== "undefined"){
        localStorage.removeItem('jwt')
        window.location = "/"
    }
    return <></>
}
