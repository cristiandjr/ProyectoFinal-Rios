import { Link, useLocation } from "react-router-dom";

// imagenes
import Hero from "../../assets/img/hero.jpg";

const Header = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover filter blur"
              src={Hero}
              alt="Imagen de hero"
            />
          </div>
          <div className="max-w-7xl mx-auto relative text-center">
            <h1 className="text-4xl font-extrabold text-black">
              ¡Bienvenid@ a <span className="text-orange-500">C</span>oder
              <span className="text-orange-500">M</span>merce nuestra tienda en
              línea!
            </h1>
            <p className="mt-4 text-lg text-black font-extrabold">
              ¡Encontra los mejores productos para todas tus necesidades!
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-block bg-orange-500 py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-300 transition-colors duration-300"
              >
                🛒 Explorar
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
