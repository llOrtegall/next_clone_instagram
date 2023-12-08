import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login.JSX'

export function App () {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
