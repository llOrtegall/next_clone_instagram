import { Link } from 'react-router-dom'

export function NavBar () {
  return (
    <nav className='bg-slate-400 flex justify-around h-16'>
      <ul className='flex items-center'>
        <figure>
          <img width={100} src="/logo.png" alt="logo" />
        </figure>
      </ul>
      <ul className='flex items-center gap-4'>
        <li>
          <Link to='/' className='text-xl font-semibold hover:text-white'>Home</Link>
        </li>
        <li>
          <Link to='items' className='text-xl font-semibold hover:text-white'>Items</Link>
        </li>
      </ul>
    </nav>
  )
}
