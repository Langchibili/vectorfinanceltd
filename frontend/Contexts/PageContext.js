import { createContext, useContext, useState } from 'react';

// Create a context
const PageContext = createContext(null);

// Create a provider component
export function PageProvider({ children }) {
  const [page, setPage] = useState(null);

  return (
    <PageContext.Provider value={{page, setPage}}>
      {children}
    </PageContext.Provider>
  )
}

// Create a custom hook to use the loggedInUser
export function usePage() {
  return useContext(PageContext);
}
