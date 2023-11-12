import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'

export function Layout () {
  return (
    <main className='w-full h-full'>
      <NavBar />
      <Outlet />
    </main>
  )
}
