"use client"

import "./globals.css";
import MainHeader from "@/components/Parts/Header/MainHeader";
import MainFooter from "@/components/Parts/Footer/MainFooter";
import MainMenu from '@/components/Parts/Menus/MainMenu';
import { UserProvider, useUser } from "@/Contexts/UserContext";
import BottomNav from "@/components/Includes/BottomNavigation/BottomNavigation";
import { ConstantsProvider } from "@/Contexts/ConstantsContext";
import { BottomNavProvider } from "@/Contexts/BottomNavContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" data-sidebar-image="none" data-preloader="disable">
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
      </head>
      <body>
      <div id="layout-wrapper">
      <UserProvider>
        <ConstantsProvider>
          <BottomNavProvider>
           <HeaderPart/>
            <div className="vertical-overlay"></div>
            <div className="main-content">
              {children}
              {/* <FooterPart/> */}
            </div>
             <BottomNav/> 
          </BottomNavProvider>
        </ConstantsProvider>
      </UserProvider>
      </div>
        {/* <!-- JAVASCRIPT --> */}
        <script src="/theme/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/theme/libs/simplebar/simplebar.min.js"></script>
        <script src="/theme/libs/node-waves/waves.min.js"></script>
        <script src="/theme/libs/feather-icons/feather.min.js"></script>
        <script src="/theme/js/pages/plugins/lord-icon-2.1.0.js"></script>
        <script src="/theme/js/plugins.js"></script>

        {/* <!-- apexcharts --> */}
        <script src="/theme/libs/apexcharts/apexcharts.min.js"></script>

        {/* <!-- Vector map--> */}
        <script src="/theme/libs/jsvectormap/js/jsvectormap.min.js"></script>
        <script src="/theme/libs/jsvectormap/maps/world-merc.js"></script>

        {/* <!--Swiper slider js--> */}
        <script src="/theme/libs/swiper/swiper-bundle.min.js"></script>

        {/* <!-- Dashboard init --> */}
        <script src="/theme/js/pages/dashboard-ecommerce.init.js"></script>

        {/* <!-- App js --> */}
        <script src="/theme/js/app.js"></script>
      </body>
    </html>
  )
}



const HeaderPart = ()=>{
  const loggedInUser = useUser()
  return (<>
              {/* Main Header */}
              <MainHeader loggedInUser={loggedInUser}/>
              {/* Sidebar */}
              <MainMenu loggedInUser={loggedInUser}/>
  </>)
}

const FooterPart = ()=>{
  const loggedInUser = useUser()
  return (<>
              {/* Main Footer */}
              <MainFooter loggedInUser={loggedInUser}/>
  </>)
}