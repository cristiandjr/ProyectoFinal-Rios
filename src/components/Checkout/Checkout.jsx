// VERSION SIMPLE
/*
import { useState, useEffect, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/config"
import { collection, addDoc } from "firebase/firestore"


const Checkout = () => {

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [emailConfirmacion, setEmailConfirmacion] = useState("")
  const [error, setError] = useState("")
  const [orderId, setOrderId] = useState("")

  const { carrito, vaciarCarrito, total, totalCantidad } = useContext(CartContext)

  // funciones y validaciones

  const manejadorFormulario = (e) => {
    e.preventDefault()

    // verificamos q los campos esten completos
    if(!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completa todos los campos")
      return // evito q me envie el form
    }

    // validamos que los campos del mail coincidad
    if(email !== emailConfirmacion) {
      setError("Los campos del mail no coinciden")
      return
    }


    // 1) creamos un objeto con todos los datos de la orden de compra:
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

    // 2) Guardar la orden en la db
    addDoc(collection(db, "ordenes"), orden)
      .then(docRef => {
        setOrderId(docRef.id)
        vaciarCarrito()
      })
      .catch(error => {
        console.log('Error al crear la orden', error)
        setError('Se produjo un error al crear la orden@')
      })



  }




  return (
    <div>
      <h2>Checkout</h2>

      <form onSubmit={manejadorFormulario}>
        {
          carrito.map(producto => (
            <div key={producto.item.id}>
              <p>{producto.item.nombre} x {producto.item.cantidad}</p>
              <p>{producto.item.precio}</p>
              <hr />
            </div>
          ))
        }

        <div>
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
            error && <p style={{color: "red"}}>{error}</p>
          }

          <button type="submit">Confirmar compra</button>
        </div>

        {
          orderId && (
            <strong>Gracias por tu compra tu numero de order es: {orderId}</strong>
          )

        }

      </form>


    </div>
  )
}

export default Checkout 

*/

// VERSION CON DESCUENTO DE STOCK 
import { useState, useEffect, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/config"
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"


const Checkout = () => {

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [emailConfirmacion, setEmailConfirmacion] = useState("")
  const [error, setError] = useState("")
  const [orderId, setOrderId] = useState("")

  const { carrito, vaciarCarrito, total, totalCantidad } = useContext(CartContext)

  // funciones y validaciones

  const manejadorFormulario = (e) => {
    e.preventDefault()

    // verificamos q los campos esten completos
    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Por favor completa todos los campos")
      return // evito q me envie el form
    }

    // validamos que los campos del mail coincidad
    if (email !== emailConfirmacion) {
      setError("Los campos del mail no coinciden")
      return
    }


    // 1) creamos un objeto con todos los datos de la orden de compra:
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



    // 2) Vamos a modificar el codigo para q ejecute varias promesas en paralelo, por un lado q actualice el stock de productos y por el otro lado q genere una orden de compra (las dos cosas al mismo tiempo)
    // Vamos a usar para lograr esto: Promise.all
    Promise.all(
      orden.items.map(async (productoOrden) => {
        const productoRef = doc(db, "productos", productoOrden.id)

        // por cada producto en la collection productos obtengo una referencia, y a partir de esa referencia obtengo el documento
        const productoDoc = await getDoc(productoRef)
        const stockActual = productoDoc.data().stock // data es un metodo q me permite acceder a la informacion del documento

        // modifico el stock y subo la informacion actualizada
        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad
        })



      })
    )
      .then(() => {
        // guardamos la orden en la db
        addDoc(collection(db, "ordenes"), orden)
          .then(docRef => {
            setOrderId(docRef.id)
            vaciarCarrito()
          })
          .catch(error => {
            console.log('Error al crear la orden', error)
            setError('Se produjo un error al crear la orden@')
          })
      })
      .catch(error => {
        console.log('No se puedo actualizar el stock', error)
        setError('No se puedo actualizar el stock')
      })


  }



  return (
    <div>
      <h2>Checkout</h2>

      <form onSubmit={manejadorFormulario}>
        {
          carrito.map(producto => (
            <div key={producto.item.id}>
              <p>{producto.item.nombre} x {producto.cantidad}</p>
              <p>{producto.item.precio}</p>
              <hr />
            </div>
          ))
        }

        <div>
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
        </div>

        {
          orderId && (
            <strong>Gracias por tu compra tu numero de order es: {orderId}</strong>
          )

        }

      </form>


    </div>
  )
}


export default Checkout 