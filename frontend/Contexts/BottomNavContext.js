import { createContext, useContext, useState } from 'react';

// Create a context
const BottomNavContext = createContext(null);

// Create a provider component
export function BottomNavProvider({ children }) {
  const [BottomNavLink, setBottomNavLink] = useState(null);

  return (
    <BottomNavContext.Provider value={{BottomNavLink, setBottomNavLink}}>
      {children}
    </BottomNavContext.Provider>
  )
}

// Create a custom hook to use the loggedInUser
export function useBottomNav() {
  return useContext(BottomNavContext);
}
