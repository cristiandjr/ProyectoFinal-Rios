import { useContext } from "react"
import { CartContext } from "../../context/CartContext"


const CartItem = ({item, cantidad}) => {

  const {eliminarProducto} = useContext(CartContext)


  return (
    <div>
      <h3>{item.nombre}</h3>
      <p>Cantidad: {cantidad}</p>
      <p>Precio: {item.precio}</p>
      <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
      <hr />
    </div>
  )
}

export default CartItem
