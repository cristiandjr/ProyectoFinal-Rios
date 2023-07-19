import { useState, useEffect } from "react";

// components
import CardProducts from "../CardProducts/CardProducts";
import Loader from "../Loader/Loader";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoader(false);
      });
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        products.map((product) => {
          return (
            <div key={product.id}>
              <CardProducts product={product} />
            </div>
          );
        })
      )}
    </>
  );
};

export default ItemListContainer;
