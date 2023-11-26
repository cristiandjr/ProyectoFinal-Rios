import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { db } from "../../services/config"
import { getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {

  const [producto, setProductos] = useState(null) 
  const { idItem } = useParams()

  useEffect(() => {

    const nuevoDoc = doc(db, "productos", idItem)
    getDoc(nuevoDoc)
      .then( res => {
        const data = res.data()
        const nuevoProducto = {id: res.id, ...data}
        setProductos(nuevoProducto)
      })
      .catch(error => console.log(error))


  }, [])


  return (
    <div>
      <ItemDetail {...producto} />
    </div>
  )
}

export default ItemDetailContainer
