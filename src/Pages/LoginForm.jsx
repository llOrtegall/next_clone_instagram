import { Lock, User } from '../Components/Icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import { useState } from 'react'
import axios from 'axios'

export function LoginForm () {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
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
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 3500)
      })
  }

  return (
    <section className='flex flex-col bg-login w-full h-full justify-center items-center'>
      <form className='w-450 h-auto py-8 flex flex-col items-center border rounded-lg backdrop-blur-md' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-semibold'>Bienvenido</h2>
        <div className="flex relative pt-12">
          <label className='text-xl font-semibold absolute bottom-10'>Usuario</label>
          <input type="text" required
            className='p-2  rounded-xl border'
            value={user} onChange={ev => setUser(ev.target.value)} />
          <figure className='w-6 flex items-center justify-center ml-2'><User /></figure>
        </div>
        <div className="flex relative pt-12">
          <label className='text-xl font-semibold absolute bottom-10'>Contraseña</label>
          <input type="password" required
            className='p-2  rounded-xl border'
            value={password} onChange={ev => setPassword(ev.target.value)} />
          <figure className='w-6 flex items-center justify-center ml-2'><Lock /></figure>
        </div>
        <button className='p-2 mt-10 bg-green-400 rounded-md text-white font-bold'>Iniciar Sesion</button>
      </form>
      {error && <p className='text-red-500 mt-4 font-semibold absolute bottom-60'>{error}</p>}
    </section>
  )
}
