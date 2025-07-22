import { createContext, useContext, useState, useEffect } from 'react'
import { checkUserLogginStatus } from '@/Constants'
import ImagePageLoader from '@/components/Includes/Loader/ImagePageLoader'
import { createReferralAccount, getReferrerFromReferralCode, saveReferralCode } from '@/Functions'

// Create a context
const UserContext = createContext(null)

// Create a provider component
export function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedinuser = await checkUserLogginStatus()
        if(loggedinuser && loggedinuser.user){ // user is logged in
          if(!loggedinuser.user.referral) {// it means you have to create a referral account to this user
            createReferralAccount(loggedinuser.user.id)
            setLoggedInUser(await checkUserLogginStatus()) // here we are re-requesting for the logged in user account because we have to get the newly updated user account with the referral account
          } 
          setLoggedInUser(loggedinuser) // here we are returning the user account because in this case, we already have a referral to the account
        }
        else{ // user not logged in (logged out)
           saveReferralCode() // you can only save the code if you are logged out
           setLoggedInUser(loggedinuser)
        }
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
