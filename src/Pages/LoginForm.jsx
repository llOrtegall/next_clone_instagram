import { Lock, User } from '../Components/Icons'
import './Login.css'

export function LoginForm () {
  return (
    <section>
      <form className='form-box'>
        <h2>Bienvenido</h2>
        <div className="inputbox">
          <figure className='icons'><User /></figure>
          <input type="text" required />
          <label >Usuario</label>
        </div>
        <div className="inputbox">
          <figure className='icons'><Lock /></figure>
          <input type="password" required />
          <label >Contraseña</label>
        </div>
        <button>Iniciar Sesion</button>
      </form>
    </section>
  )
}
