import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const getUser = (dataUser) => {
    setUser(dataUser)
  }

  const login = (boolen) => {
    if (boolen === true) {
      setIsAuthenticated(boolen)
    } else {
      setIsAuthenticated(boolen)
    }
  }

  const logout = () => {
    setIsAuthenticated(null)
    setUser({})
  }

  console.log(isAuthenticated)
  console.log(user)

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}
