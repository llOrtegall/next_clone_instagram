import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'

export function Layout () {
  return (
    <main className='main'>
      <NavBar />
      <Outlet />
    </main>
  )
}
