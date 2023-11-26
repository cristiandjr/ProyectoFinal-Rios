import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
//import { getUnproducto } from "../../asyncmock"
import ItemDetail from "../ItemDetail/ItemDetail"
import { db } from "../../services/config"
import { getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {

  // estado
  const [producto, setProductos] = useState(null) // cuando es 1 solo obj generalmente se inicia como null

  // obtengo el id que viene por url
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


  /*
  useEffect(() => {
    getUnproducto(idItem)
    .then(response => setProductos(response))
    .catch(error => console.log(error))
  }, [idItem]) // si esto cambia tiene q ejecutar otra vez la peticion
  */

  return (
    <div>
      {/** le paso todo los productos con el spred me ahorro pasar 1 por 1 */}
      <ItemDetail {...producto} />
    </div>
  )
}

export default ItemDetailContainer
