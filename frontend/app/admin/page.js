"use client"
      
import AdminHome from '@/components/Includes/AdminComponents/AdminHome'
import { useConstants } from '@/Contexts/ConstantsContext'
import { useUser } from '@/Contexts/UserContext'
import React from 'react'

export default function Admin(){
    const constants = useConstants()
    const loggedInUser = useUser()
    return <AdminHome constants={constants} loggedInUser={loggedInUser.user}/>
}