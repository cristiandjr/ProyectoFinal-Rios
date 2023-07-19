import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// components
import Loader from "../Loader/Loader";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoader(false);
      });
  }, [id]);

  const { title, category, description, image, price } = product;

  return (
    <>
      {loader ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <div className="max-w-3xl flex-shrink-0 relative mt-5 mb-5 m-auto overflow-hidden bg-orange-300 rounded-lg shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: "scale(1.5)", opacity: "0.1" }}
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="black"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="black"
            />
          </svg>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
                <img
                  src={image}
                  className="relative w-full"
                  alt="Imagen Anteojo Producto"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative text-white px-6 pb-6 mt-6">
                <span className="block opacity-75 mb-1">{category}</span>
                <div className="block">
                  <span className="block font-semibold text-xl mb-1">
                    {title}
                  </span>
                  <span className="block text-xs">{description}</span>
                  <div className="mt-5 flex justify-between flex-wrap">
                    <span className="bg-white rounded-full text-black text-xs font-bold px-3 py-2 leading-none flex items-end h-6 w-auto">
                      ${price}
                    </span>
                    <span className="bg-white rounded-full text-black text-xs font-bold px-3 py-2 leading-none flex items-end h-6 w-auto">
                      <Link to="/">Volver a la tienda</Link>
                    </span>
                    <span className="bg-white rounded-full mb-2 text-black text-xs font-bold px-3 py-2 leading-none flex items-end h-6 w-auto">
                      🛒 Comprar
                    </span>
                    <span className="bg-white rounded-full text-black text-xs font-bold px-3 py-2 leading-none flex items-end h-6 w-auto">
                      📦 Stock 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailContainer;
