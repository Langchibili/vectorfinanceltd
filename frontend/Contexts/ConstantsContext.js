import { createContext, useContext, useState, useEffect } from 'react'
import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader'
import { getAdminInitials, getAdminSignature, getLoanCategoryIds, getLoansInformation, getLoanTypesIds } from '@/Functions'
import PageSkeleton from '@/components/Includes/Loader/PageSkeleton'
import { LinearProgress } from '@mui/material'

// Create a context
const ConstantsContext = createContext(null)

// Create a provider component
export function ConstantsProvider({ children }) {
  const [constants, setConstants] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const constantsObject = {
            loanCategoriesIds : await getLoanCategoryIds(),
            loanTypesIds : await getLoanTypesIds(),
            loansInformation : await getLoansInformation(),
            adminSignatures : await getAdminSignature(),
            adminInitials : await getAdminInitials()
        }
        console.log('constantsObject',constantsObject)
        setConstants(constantsObject)
      } catch (error) {
        console.error('Error fetching logged in user:', error)
      } finally {
        setLoading(false);
      }
    }

    if (typeof window !== 'undefined') {
      fetchConstants();
    }
  }, []);

  if (typeof window !== "undefined" && loading) {
    if(window.location.pathname.startsWith('/admin')){
       return (<>
                <LinearProgress color='secondary'/> 
                <PageSkeleton title="Loading loan..." loading={true}/>
             </>)
    }
    else{
       return <ImagePageLoader/> // Show a loading state if needed
    }
  }
  
  return (
    <ConstantsContext.Provider value={constants}>
      {children}
    </ConstantsContext.Provider>
  );
}

// Create a custom hook to use the loggedInUser
export function useConstants() {
  return useContext(ConstantsContext);
}
