import { Link, Outlet } from 'react-router-dom'

export function Items () {
  return (
    <section className='w-full h-900 flex'>

      <nav className='w-1/6 bg-blue-400 h-full px-6 pt-6'>
        <ul className='flex flex-col gap-4 text-center'>
          <li><Link to='getItems'>Ver Items</Link></li>
          <li><Link to='createItem'>Crear Activo</Link> </li>
          <li><Link to='getItems'>get Activo</Link> </li>
          <li><Link to='updateItem'>update Activo</Link> </li>
          <li><Link to='crearMovimien'>Crear Movimiento</Link> </li>
        </ul>
      </nav>

      <section className='w-5/6 '>
        <Outlet />
      </section>
    </section>
  )
}
