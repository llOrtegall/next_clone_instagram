import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Resumen } from './pages/Resumen'

export function App () {
  return (
    <section className='w-screen h-screen flex'>

      <nav className='bg-blue-300 w-[20vw] h-[100vh]'>

        <figure>
          <i className="ri-building-line"></i>
        </figure>

        <ul className='flex items-center flex-col'>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/resumen">Resumen</a>
          </li>
        </ul>
      </nav>

      <main className='w-[80vw] bg-red-200'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/resumen' element={<Resumen />} />
        </Routes>
      </main>

    </section>
  )
}
