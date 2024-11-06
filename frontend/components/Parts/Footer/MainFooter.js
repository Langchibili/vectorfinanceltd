'use client'

import { clientUrl } from '@/Constants';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation'; // Import useParams to access dynamic route params

export default function MainFooter() {
  // const params = useParams(); // Get params for dynamic route changes

  // useEffect(() => {
  //   // List of new scripts to be loaded
  //   const scripts = [
  //     clientUrl + '/theme/libs/bootstrap/js/bootstrap.bundle.min.js',
  //     clientUrl + '/theme/libs/simplebar/simplebar.min.js',
  //     clientUrl + '/theme/libs/node-waves/waves.min.js',
  //     clientUrl + '/theme/libs/feather-icons/feather.min.js',
  //     clientUrl + '/theme/js/pages/plugins/lord-icon-2.1.0.js',
  //     clientUrl + '/theme/js/plugins.js',
  //     clientUrl + '/theme/libs/apexcharts/apexcharts.min.js',
  //     clientUrl + '/theme/libs/jsvectormap/js/jsvectormap.min.js',
  //     clientUrl + '/theme/libs/jsvectormap/maps/world-merc.js',
  //     clientUrl + '/theme/libs/swiper/swiper-bundle.min.js',
  //     clientUrl + '/theme/js/pages/dashboard-ecommerce.init.js',
  //     clientUrl + '/theme/js/app.js'
  //   ];

  //   // Check if the script is already loaded
  //   const isScriptLoaded = (src) => !!document.querySelector(`script[src="${src}"]`);

  //   // Function to load scripts
  //   const loadScripts = () => {
  //     scripts.forEach((src) => {
  //       if (!isScriptLoaded(src)) {
  //         const script = document.createElement('script');
  //         script.src = src;
  //         script.async = false; // Ensures correct execution order
  //         script.onload = () => {
  //           console.log(`${src} has been loaded and executed.`);
  //         };
  //         document.body.appendChild(script); // Append to the body
  //       }
  //     });
  //   };

  //   // Function to remove scripts
  //   const removeScripts = () => {
  //     scripts.forEach((src) => {
  //       const script = document.querySelector(`script[src="${src}"]`);
  //       if (script) {
  //         document.body.removeChild(script);
  //       }
  //     });
  //   };

  //   // Load scripts when params change (route changes)
  //   loadScripts();

  //   // Cleanup old scripts when params change or on unmount
  //   // return () => {
  //   //   removeScripts();
  //   // };
  // }, []); // at times Re-run effect on params change, for now run once

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">2024 © VectorFinanceLimited.</div>
          <div className="col-sm-6">
            {/* <div className="text-sm-end d-none d-sm-block">
              Design &amp; Develop by Langtechdev
            </div> */}
          </div>
        </div>
      </div>
  )
}
