import { useState, createContext } from "react"

export const CartContext = createContext({
  carrito: [],
  total: 0,
  cantidadTotal: 0
})

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [cantidadTotal, setCantidadTotal] = useState(0)

  const agregarAlCarrito = (item, cantidad) => {
    const productoExistente = carrito.find(prop => prop.item.id === item.id)

    if (!productoExistente) {

      setCarrito(prev => [...prev, { item, cantidad }])
      setCantidadTotal(prev => prev + cantidad)
      setTotal(prev => prev + (item.precio * cantidad))

    } else {

      const carritoActualizado = carrito.map(prod => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + cantidad }
        } else {
          return prod
        }
      })

      setCarrito(carritoActualizado)
      setCantidadTotal(prev => prev + cantidad)
      setTotal(prev => prev + (item.precio * cantidad))
    }

  }

  const eliminarProducto = (id) => {
    const productoEliminado = carrito.find(prod => prod.item.id === id)
    const carritoActualizado = carrito.filter(prod => prod.item.id !== id)

    setCarrito(carritoActualizado)
    setTotal(prev => prev - productoEliminado.item.precio * productoEliminado.cantidad)
    setCantidadTotal(prev => prev - productoEliminado.cantidad)
  }

  const vaciarCarrito = () => {
    setCarrito([])
    setCantidadTotal(0)
    setTotal(0)
  }

  return (
    <CartContext.Provider
      value={{
        carrito,
        total,
        cantidadTotal,
        agregarAlCarrito,
        eliminarProducto,
        vaciarCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  )
}



export default CartProvider
