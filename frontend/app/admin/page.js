"use client"
      
import AdminHome from '@/components/Includes/AdminComponents/AdminHome'
import { useConstants } from '@/Contexts/ConstantsContext'
import { useUser } from '@/Contexts/UserContext'
import { scrolltoTopOFPage } from '@/Functions'
import React from 'react'

export default function Admin(){
    scrolltoTopOFPage() // should always show the top of the page as the view point
    const constants = useConstants()
    const loggedInUser = useUser()
    return (<> <AdminHome constants={constants} loggedInUser={loggedInUser.user}/> </>)
}