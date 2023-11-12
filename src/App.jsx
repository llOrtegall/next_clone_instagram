import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Dashboard } from './Pages/Dashboard'
import { LoginForm } from './Pages/LoginForm'
import { Layout } from './Components/Layout'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://172.20.1.160:3000'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return children
}

export function App () {
  const { isAuthenticated, login, getUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const cookie = document.cookie
    if (cookie) {
      const [name, token] = cookie.split('=')
      if (name === 'stock') {
        axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            login(res.data.auth)
            getUser(res.data.user)
            navigate('/dashboard')
          })
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
