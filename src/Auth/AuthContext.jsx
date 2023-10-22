import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    // Perform login logic here
    setUser(userData)
  }

  const logout = () => {
    // Perform logout logic here
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
