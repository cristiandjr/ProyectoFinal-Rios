import { useState, useEffect } from "react"


const Count = ({ inicial, stock, funcionAgregar }) => {

    const [contador, setContador] = useState(inicial)

    const sumarContador = () => {
        if (contador < stock) {
            setContador(contador + 1)
        }
    }

    const restarContador = () => {
        if (contador > inicial) {
            setContador(contador - 1)
        }
    }

    return (
        <>
            <div>
                <button onClick={restarContador}>-</button>
                <strong>{contador}</strong>
                <button onClick={sumarContador}>+</button>
            </div>
            <button onClick={() => funcionAgregar(contador)}>Agregar al carrito</button>
        </>
    )
}

export default Count
