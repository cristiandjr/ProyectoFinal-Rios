import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Count from '../Count/Count'
import { CartContext } from '../../context/CartContext'

import './ItemDetail.css'

const ItemDetail = ({id, nombre, precio, stock, img, desc}) => {

  const { agregarAlCarrito } = useContext(CartContext)

  const [agregarCantidad, setAgregarCantidad] = useState(0)

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad)

    const item = {id, nombre, precio}
    agregarAlCarrito(item, cantidad)
  }

  return (
    <div className='contenedorItem'>

      <img src={img} alt={nombre} />

      <div>
        <h2>{nombre}</h2>
        <h3>${precio}</h3>
        <h4>#{id}</h4>
        <p>{desc}</p>
        {
          agregarCantidad > 0 ? (<Link to='/cart'>Terminar Compra</Link>) : (<Count inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/>)
        }
      </div>
    </div>
  )
}

export default ItemDetail
