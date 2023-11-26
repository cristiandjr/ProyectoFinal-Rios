import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({id, nombre, precio, img, stock}) => {

  return (
    <div className="cardProducto">
        <img src={img} alt={nombre} />
        <h3>Nombre: {nombre}</h3>
        <p>Precio: {precio}</p>
        <p>Stock: {stock}</p> 
        <p>ID: {id}</p>
        <Link to={`/item/${id}`}>Ver detalles</Link>
    </div>
  )
}

export default Item
