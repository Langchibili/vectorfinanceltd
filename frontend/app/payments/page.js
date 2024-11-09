'use client'

import PaymentsDisplay from "@/components/Includes/PaymentsDisplay/PaymentsDisplay";
import { useBottomNav } from "@/Contexts/BottomNavContext";
import { useConstants } from "@/Contexts/ConstantsContext";
import { useUser } from "@/Contexts/UserContext";

export default function Payments() {
   const loggedInUser = useUser()
   if(!loggedInUser){
    return <></>
   } 
   return <PaymentsDisplay loggedInUser={loggedInUser.user}/>
}