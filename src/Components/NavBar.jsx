import { Link } from 'react-router-dom'

export function NavBar () {
  return (
    <nav>
      <ul>
        <figure>
          <img width={80} src="/logo.png" alt="logo" />
        </figure>
      </ul>
      <ul>
        <li>
          <Link to='/'>Inicio</Link>
        </li>
        <li>
          <Link to='items'>Items</Link>
        </li>
      </ul>
    </nav>
  )
}
