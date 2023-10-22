import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './Pages/LoginForm'
import { Layout } from './Components/Layout'
import { useAuth } from './Auth/AuthContext'

function About () {
  return (
    <h2>About</h2>
  )
}

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return children
}

export function App () {
  return (
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/' element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route path='about' element={<About />} />
      </Route>
    </Routes>
  )
}
