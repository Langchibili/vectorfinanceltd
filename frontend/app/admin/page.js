"use client"
      
import AdminHome from '@/components/Includes/AdminComponents/AdminHome'
import { useConstants } from '@/Contexts/ConstantsContext'
import { useUser } from '@/Contexts/UserContext'
import { scrolltoTopOFPage } from '@/Functions'
import React, { useEffect, useState } from 'react'

export default function Admin({searchParams}){
    const { redirectUrl } = searchParams
    scrolltoTopOFPage() // should always show the top of the page as the view point
    const constants = useConstants()
    const loggedInUser = useUser()
    return (<> {loggedInUser? <AdminHome redirectUrl={redirectUrl} constants={constants} loggedInUser={loggedInUser.user}/> : null} </>)
}