"use client"

import MainForm from "@/components/Forms/MainForm";
import { useUser } from "@/Contexts/UserContext";
import Image from "next/image";

export default function Home() {
  const loggedInUser = useUser()
  if(!loggedInUser.status){
     if(typeof window !== "undefined"){
       window.location = "/signin"
     }
  }
  return (
    <div className="page-content">
    <div className="container-fluid">
      <MainForm loggedInUser={loggedInUser.user}/>
    </div>
    {/* container-fluid */}
  </div>
  )
}
