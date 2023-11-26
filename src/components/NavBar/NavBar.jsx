import { Link, NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'


const NavBar = () => {
  return (
    <header>
      <Link to="/">
        <img src="./img/logo.png" alt="Logo CoderMmerce" />
      </Link>
      <nav>
        <ul>
          <li><NavLink to="/categoria/1">Remeras</NavLink></li>
          <li><NavLink to="/categoria/2">Zapatillas</NavLink></li>
          <li><NavLink to="/categoria/3">Pantalones</NavLink></li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  )
}

export default NavBar
