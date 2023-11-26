import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Count from '../Count/Count'
import { CartContext } from '../../context/CartContext'

import './ItemDetail.css'

const ItemDetail = ({id, nombre, precio, stock, img}) => {

  const { agregarAlCarrito } = useContext(CartContext)

  // creamos un estado local con la cantidad de productos agregados
  const [agregarCantidad, setAgregarCantidad] = useState(0)

  // creamos una funcion manejadora de la cantidad
  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad)
    //  console.log("Productos agregados ", cantidad);

    // creo un obj con el item y la cantidad
    const item = {id, nombre, precio}
    agregarAlCarrito(item, cantidad)
  }

  return (
    <div className='contenedorItem'>
      <h2>Nombre: {nombre}</h2>
      <h3>Precio: {precio}</h3>
      <h4>ID: {id}</h4>
      <img src={img} alt={nombre} />
      <br />
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque tempora nostrum laudantium, pariatur repellat, iure similique, quod labore perferendis magni maiores voluptas mollitia exercitationem esse voluptatum! Dignissimos laudantium corporis ipsam!</p>


      {
        // aca empleamos la logica de montaje y desmotanje del contador

        // si es mayor a cero es xq tengo algo en el carrito
        agregarCantidad > 0 ? (<Link to='/cart'>Terminar Compra</Link>) : (<Count inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/>)
      }
    </div>
  )
}

export default ItemDetail
