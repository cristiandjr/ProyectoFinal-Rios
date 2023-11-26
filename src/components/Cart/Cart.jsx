import { useContext } from "react"
import { CartContext } from "../../context/CartContext" 
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"

const Cart = () => {

  const {carrito, total, cantidadTotal, vaciarCarrito} = useContext(CartContext)

  if(cantidadTotal === 0) {
    return (
      <>
        <h2>No hay productos en el carrito.</h2>
        <Link to="/">Ver productos</Link>
      </>
    )
  }

  return (
    <div>
      {
        carrito.map(producto => <CartItem key={producto.item.id} {...producto} />)
      }
      <h3>Total: ${total}</h3>
      <h4>Cantidad total: {cantidadTotal}</h4>
      <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
      <Link to='/checkout'>Finalizar compra</Link>
    </div>
  )
}

export default Cart
