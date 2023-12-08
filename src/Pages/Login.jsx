import { Lock, User } from '../Components/Icons.jsx'
export function Login () {
  return (
    <section className="h-screen flex items-center justify-center">
      <form className="flex flex-col px-10 gap-4 bg-slate-600 w-96 py-20 justify-center rounded-lg">
        <h3 className="text-center text-white font-semibold text-3xl">Bienvenido</h3>
        <label className="text-white font-semibold">Usuario / Email</label>
        <div className='flex items-center justify-center gap-1 text-white'>
          <User />
          <input className="w-full rounded-md py-2 outline-none px-1" type='text' />
        </div>
        <label className="text-white font-semibold">Contraseña</label>
        <div className='flex items-center justify-center gap-1 text-white'>
          <Lock />
          <input className="w-full rounded-md py-2 outline-none px-1" type='password' />
        </div>
        <button className="button_login mt-4">Iniciar Sesión</button>
      </form>
    </section>
  )
}
