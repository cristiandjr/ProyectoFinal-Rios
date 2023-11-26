import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({id, nombre, precio, img, stock}) => {

  return (
    <div className="cardProducto">
        <img src={img} alt={nombre} />
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
        <p>Stock: {stock}</p> 
        <p>#{id}</p>
        <Link to={`/item/${id}`}>Ver detalles</Link>
    </div>
  )
}

export default Item
