import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Resumen } from './pages/Resumen'

export function App () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/resumen' element={<Resumen />} />
    </Routes>
  )
}
