import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

import CarritoImg from '/carrito.png'
import './CartWidget.css'

const CartWidget = () => {

  const { cantidadTotal } = useContext(CartContext)

  return (
    <div className='contenedorChanguito'>

      <Link to="/cart">
        <img src={CarritoImg} alt="Carrito de compras" className='imgCarrito' />
        {
          cantidadTotal > 0 && <strong className='cantidadTotal'>{cantidadTotal}</strong>
        }
      </Link>


    </div>
  )
}

export default CartWidget
