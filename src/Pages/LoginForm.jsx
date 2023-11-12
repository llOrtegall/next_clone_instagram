import { Lock, User } from '../Components/Icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import { useState } from 'react'
import axios from 'axios'
import './Login.css'

export function LoginForm () {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { login } = useAuth()

  const handleSubmit = (ev) => {
    ev.preventDefault()
    axios.post('/login', { user, password })
      .then(res => {
        login(res.data.auth)
        document.cookie = `stock=${res.data.token}`
        navigate('/')
      })
  }

  return (
    <section>
      <form className='form-box' onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        <div className="inputbox">
          <figure className='icons'><User /></figure>
          <input type="text" required
            value={user} onChange={ev => setUser(ev.target.value)} />
          <label >Usuario</label>
        </div>
        <div className="inputbox">
          <figure className='icons'><Lock /></figure>
          <input type="password" required
            value={password} onChange={ev => setPassword(ev.target.value)} />
          <label >Contraseña</label>
        </div>
        <button>Iniciar Sesion</button>
      </form>
    </section>
  )
}
