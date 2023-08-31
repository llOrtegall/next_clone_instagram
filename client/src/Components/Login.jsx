import { useState } from 'react'

export function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (

    <section className="bg-blue-50 h-screen flex items-center">
      <form className="w-72 mx-auto mb-12">

        <input value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text" placeholder="Usuario"
          className="block w-full rounded-sm p-2 mb-2 border" />

        <input value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password" placeholder="Contraseña"
          className="block w-full rounded-sm p-2 mb-2 border" />

        <button type='submit' className="bg-blue-500 text-white block w-full p-2 rounded-md">
          Login
        </button>
        <div className='text-center mt-2'>
        </div>
      </form>

    </section>
  )
}