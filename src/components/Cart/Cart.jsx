import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"

import './Cart.css'

const Cart = () => {

  const { carrito, total, cantidadTotal, vaciarCarrito } = useContext(CartContext)

  if (cantidadTotal === 0) {
    return (
      <>
        <h2>No hay productos en el carrito.</h2>
        <Link to="/" className="center">Ver productos</Link>
      </>
    )
  }

  return (
    <div className="contenedorTotales">
      <div>
        {
          carrito.map(producto => <CartItem key={producto.item.id} {...producto} />)
        }
      </div>
      <div className="contenedorTotales-total">
        <h3>Total: ${total}</h3>
        <h4>Cantidad total: {cantidadTotal}</h4>
        <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
        <Link to='/checkout'>Finalizar compra</Link>
      </div>
    </div>
  )
}

export default Cart
