import { createContext, useContext, useState, useEffect } from 'react'
import { checkUserLogginStatus } from '@/Constants'
import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader'

// Create a context
const UserContext = createContext(null)

// Create a provider component
export function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkUserLogginStatus()
        console.log(user)
        setLoggedInUser(user)
      } catch (error) {
        console.error('Error fetching logged in user:', error)
      } finally {
        setLoading(false);
      }
    }

    if (typeof window !== 'undefined') {
      fetchUser();
    }
  }, []);

  if (loading) {
    return <ImagePageLoader/> // Show a loading state if needed
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to use the loggedInUser
export function useUser() {
  return useContext(UserContext);
}
