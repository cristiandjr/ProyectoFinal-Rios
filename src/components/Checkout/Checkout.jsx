import { useState, useEffect, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/config"
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"

import './Checkout.css'

const Checkout = () => {

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [emailConfirmacion, setEmailConfirmacion] = useState("")
  const [error, setError] = useState("")
  const [orderId, setOrderId] = useState("")

  const { carrito, vaciarCarrito, total, totalCantidad } = useContext(CartContext)

  const manejadorFormulario = (e) => {
    e.preventDefault()

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completa todos los campos")
      return
    }

    if (email !== emailConfirmacion) {
      setError("Los campos del mail no coinciden")
      return
    }

    const orden = {
      items: carrito.map(producto => ({
        id: producto.item.id,
        nombre: producto.item.nombre,
        cantidad: producto.cantidad
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email
    }

    Promise.all(
      orden.items.map(async (productoOrden) => {
        const productoRef = doc(db, "productos", productoOrden.id)

        const productoDoc = await getDoc(productoRef)
        const stockActual = productoDoc.data().stock

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad
        })
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), orden)
          .then(docRef => {
            setOrderId(docRef.id)
            vaciarCarrito()
          })
          .catch(error => {
            console.log('Error al crear la orden', error)
            setError('Se produjo un error al crear la orden')
          })
      })
      .catch(error => {
        console.log('No se puedo actualizar el stock', error)
        setError('No se puedo actualizar el stock')
      })

  }

  return (
    <div className="contenedorCheckout">

      <h2>Checkout</h2>

      <form onSubmit={manejadorFormulario} className="contenedorForm">

        <div className="contenedorForm-listado">
          {
            carrito.map(producto => (
              <div key={producto.item.id}>
                <p>{producto.item.nombre} x {producto.cantidad}</p>
                <p>Total: ${producto.item.precio}</p>
                <hr />
              </div>
            ))
          }
        </div>

        <div className="contenedorForm-inputs">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <br />

          <label htmlFor="apellido">Apellido</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <br />

          <label htmlFor="telefono">Teléfono</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <br />

          <label htmlFor="email">Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />

          <label htmlFor="emailConfirmacion">Confirmar Email</label>
          <input type="text" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
          <br />

          {
            error && <p style={{ color: "red" }}>{error}</p>
          }

          <button type="submit">Confirmar compra</button>

          <hr />
          {
            orderId && (
              <strong>Gracias por tu compra!!! <br /> Tu numero de order es: <span>{orderId}</span></strong>
            )
          }

        </div>

      </form>

    </div>
  )
}


export default Checkout 