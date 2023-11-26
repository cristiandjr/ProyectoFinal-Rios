// 1 importar useState y createContext q me permite crear un contexto q almacenara toda la logica de mi carrito de compras
import { useState, createContext } from "react"

// 2 creamos el contexto (el obj global)
export const CartContext = createContext({
  carrito: [], // a medida q vaya agregando productos esto se va ir llenando
  total: 0, // total en efectivo q va ir sumando el usuario cuando va comprando mas productos
  cantidadTotal: 0 // cantidad de productos selecionados (es el contado q se ve en el carrito del navbar)
})

// El valor inicial es un obj, con la propiedad carrito, q es un arr vacio, total y cantidadTotal

export const CartProvider = ({ children }) => {
  // 3 creamos el estado pa el carrito, total y cantidadTotal
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [cantidadTotal, setCantidadTotal] = useState(0)

  // verificamos por consola
  //  console.log(carrito)

  // 4 agregamos alfunas funciones auxiliares para la logica del carrito (ej: agregar producto, eliminar, etc.)

  const agregarAlCarrito = (item, cantidad) => {
    // verifico si el producto ya esta agregado (evitamos duplicados)
    const productoExistente = carrito.find(prop => prop.item.id === item.id)

    //
    if (!productoExistente) {

      // actualizo con un nuevo arr todo el tiempo, me a a crear un arr apartir del estado anterior 

      // la sintaxis: prev => [...prev, {item, cantidad}] se utiliza para crear un nuevo arr a partir del estado anterior del carrito y agregar un nuevo obj q representa el producto agregado (es como un acumulativo)
      setCarrito(prev => [...prev, { item, cantidad }])
      setCantidadTotal(prev => prev + cantidad)
      setTotal(prev => prev + (item.precio * cantidad)) // multiplicamos el precio x la cantidad q agrego el usuario osea si agrego 10 paquetes de arroz seria 10 * el precio del arroz

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

  // Funcion para eliminar producto
  const eliminarProducto = (id) => {
    // busco el id que coincida (la utilizamos para descontar)
    const productoEliminado = carrito.find(prod => prod.item.id === id)
    // muestro el carrito actualizado sin el producto borrado
    const carritoActualizado = carrito.filter(prod => prod.item.id !== id)

    setCarrito(carritoActualizado)
    setTotal(prev => prev - productoEliminado.item.precio * productoEliminado.cantidad )
    setCantidadTotal(prev => prev - productoEliminado.cantidad)
  }

  // Funcion para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([])
    setCantidadTotal(0)
    setTotal(0)
  }


  // CHILDREN usamos esta propiedad especial para representar a todos aquellos componentes q puedan necesitar el carrito y sus funciones



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
      { children }
    </CartContext.Provider>
  )
}



export default CartProvider
