// 'use client'

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';

// export default function PageLoader2(props) {
//   const [progress, setProgress] = React.useState(0);
//   const [buffer, setBuffer] = React.useState(10);

//   const progressRef = React.useRef(() => {});
//   React.useEffect(() => {
//     progressRef.current = () => {
//       if (progress > 100) {
//         setProgress(0);
//         setBuffer(10);
//       } else {
//         const diff = Math.random() * 10;
//         const diff2 = Math.random() * 10;
//         setProgress(progress + diff);
//         setBuffer(progress + diff + diff2);
//       }
//     };
//   });

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       progressRef.current();
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <Box sx={{ width: '100%' }} style={{display:'none',marginTop:'-30px'}}>
//       <LinearProgress color="secondary" variant="buffer" value={progress} valueBuffer={buffer} />
//     </Box>
//   );
// }

'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PageLoader2() {
  const [progress, setProgress] = React.useState(0)
  const [buffer, setBuffer] = React.useState(10)
  const [isLoading, setIsLoading] = React.useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const progressRef = React.useRef(() => {})

  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0)
        setBuffer(10)
      } else {
        const diff = Math.random() * 10
        const diff2 = Math.random() * 10
        setProgress(progress + diff)
        setBuffer(progress + diff + diff2)
      }
    }
  }, [progress])

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current()
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Listen for URL changes using usePathname and useSearchParams
  React.useEffect(() => {
    const url = `${pathname}?${searchParams}`
    setIsLoading(true)

    // Simulate a short delay to show the loader (you can adjust this as needed)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return (
    <Box sx={{ width: '100%', display: isLoading ? 'block' : 'none', marginTop: '-30px' }}>
      <LinearProgress color="secondary" variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  )
}
