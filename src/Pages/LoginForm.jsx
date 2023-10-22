import { Lock, User } from '../Components/Icons'
import './Login.css'

export function LoginForm () {
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form>
            <h2>Bienvenido</h2>
            <div className="inputbox">
              <figure className='icons'><User /></figure>
              <input type="text" required />
              <label >Username</label>
            </div>
            <div className="inputbox">
              <figure className='icons'><Lock /></figure>
              <input type="password" required />
              <label >Password</label>
            </div>
            <button>Iniciar Sesion</button>
          </form>
        </div>
      </div>
    </section>
  )
}
