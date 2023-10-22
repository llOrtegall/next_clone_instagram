import { useAuth } from '../Auth/AuthContext'
import { useNavigate } from 'react-router'

export function LoginForm () {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    login(true)
    navigate('/')
  }

  return (
    <button onClick={handleClick}>
      login
    </button>
  )
}
