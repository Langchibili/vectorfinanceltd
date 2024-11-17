"use client"

import "./globals.css";
import MainFooter from "@/components/Parts/Footer/MainFooter";
import { UserProvider, useUser } from "@/Contexts/UserContext";
import BottomNav from "@/components/Includes/BottomNavigation/BottomNavigation";
import { ConstantsProvider } from "@/Contexts/ConstantsContext";
import { BottomNavProvider } from "@/Contexts/BottomNavContext";
import { PageProvider } from "@/Contexts/PageContext";
import React from "react";
import Script from "next/script";
import MobileNav from "@/components/Parts/Header/MobileNav";


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="sm"  data-sidebar-image="none" data-preloader="disable">
      <head>
      <meta charSet="utf-8" />
        <title>Portal | Vector Finance Limited</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          content="premium interest loans"
          name="description"
        />
        <meta content="langtechdev" name="author" />
        {/* App favicon */}

        <link rel="shortcut icon" href="/vectorfinancelimitedlogo.jpg" />
        {/* jsvectormap css */}
        <link
          href="/theme/libs/jsvectormap/css/jsvectormap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/*Swiper slider css*/}
        <link
          href="/theme/libs/swiper/swiper-bundle.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="/theme/libs/aos/aos.css"></link>
        {/* Layout config Js */}
        {/* Bootstrap Css */}
       <link href="/theme/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        {/* Icons Css */}
        <link href="/theme/css/icons.min.css" rel="stylesheet" type="text/css" />
        {/* App Css*/}
        <link href="/theme/css/app.min.css" rel="stylesheet" type="text/css" />
        {/* custom Css*/}
        <link href="/theme/css/custom.min.css" rel="stylesheet" type="text/css" />
      {/* <!-- JAVASCRIPT --> */}
      </head>
      <body>
      <div id="layout-wrapper">
      <UserProvider>
        <ConstantsProvider>
         <PageProvider>
          <BottomNavProvider>
           <HeaderPart/>
            <div className="vertical-overlay"></div>
            <div className="main-content">
              {children}
              {/* <FooterPart/> */}
            </div>
            <BottomNav/>
          </BottomNavProvider>
         </PageProvider>
        </ConstantsProvider>
      </UserProvider>
      </div>
        <Script src="/theme/libs/bootstrap/js/bootstrap.bundle.min.js"></Script>
        {/* <Script src="/theme/libs/simplebar/simplebar.min.js"></Script> */}
        {/* <Script src="/theme/libs/node-waves/waves.min.js"></Script>
        <Script src="/theme/libs/feather-icons/feather.min.js"></Script>
        <Script src="/theme/js/pages/plugins/lord-icon-2.1.0.js"></Script>
        <Script src="/theme/js/plugins.js"></Script> */}

        {/* <!-- apexcharts --> */}
        {/* <Script src="/theme/libs/apexcharts/apexcharts.min.js"></Script> */}

        {/* <!-- Vector map--> */}
        {/* <Script src="/theme/libs/jsvectormap/js/jsvectormap.min.js"></Script>
        <Script src="/theme/libs/jsvectormap/maps/world-merc.js"></Script> */}

        {/* <!--Swiper slider js--> */}
        {/* <Script src="/theme/libs/swiper/swiper-bundle.min.js"></Script> */}

        {/* <!-- Dashboard init --> */}
        {/* <script src="/theme/js/pages/dashboard-ecommerce.init.js"></script> */}

        {/* <!-- App js --> */}
        {/* <Script src="/theme/js/app.js"></Script> */}
      </body>
    </html>
  )
}



const HeaderPart = ()=>{
  const loggedInUser = useUser()
  return (<>
              {/* Main Header | Only visible to logged in users */}
              {loggedInUser.status? <MobileNav loggedInUser={loggedInUser.user} userIsLoggedIn={loggedInUser.status}/> : <></>}
              {/* Sidebar */}
  </>)
}

const FooterPart = ()=>{
  const loggedInUser = useUser()
  return (<>
              {/* Main Footer */}
              <MainFooter loggedInUser={loggedInUser.user} userIsLoggedIn={loggedInUser.status}/>
  </>)
}