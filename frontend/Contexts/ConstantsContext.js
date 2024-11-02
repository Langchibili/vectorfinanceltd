import { createContext, useContext, useState, useEffect } from 'react'
import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader'
import { getLoanCategoryIds, getLoansInformation, getLoanTypesIds } from '@/Functions'

// Create a context
const ConstantsContext = createContext(null)

// Create a provider component
export function ConstantsProvider({ children }) {
  const [constants, setConstants] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const constantsObject = {
            loanCategoriesIds : await getLoanCategoryIds(),
            loanTypesIds : await getLoanTypesIds(),
            loansInformation : await getLoansInformation()
        }
        
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

  if (loading) {
    return <ImagePageLoader/> // Show a loading state if needed
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
