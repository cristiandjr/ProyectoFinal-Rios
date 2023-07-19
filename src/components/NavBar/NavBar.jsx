import { useState } from "react";
import { Link } from "react-router-dom";

// components
import CartWidget from "../CartWidget/CartWidget";
import Category from "../Category/Category";

import LogoCoderMmerce from "../../assets/img/codermmerce-logo.png";

const NavBar = () => {
  const [menuResponsive, setMenuResponsive] = useState(false);

  return (
    <nav className="flex bg-gray-300 items-center justify-between flex-wrap p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
        <Link to="/">
          <img
            src={LogoCoderMmerce}
            className="w-32 h-auto"
            alt="Logo CoderMmerce"
          />
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuResponsive(!menuResponsive)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${menuResponsive ? "hidden" : "block"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${menuResponsive ? "block" : "hidden"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          menuResponsive ? "block" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            href="#"
            className="block mt-4 p-2 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-orange-300 transition duration-300 ease-in-out"
          >
            Inicio
          </Link>

          <Category />

          {/*/<Link
            to="#"
            className="block mt-4 p-2 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-orange-300 transition duration-300 ease-in-out"
          >
            Ofertas
          </Link>
          <a
            to="#"
            className="block mt-4 p-2 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-orange-300 transition duration-300 ease-in-out"
          >
            Contacto
          </a>
        */}
        </div>
        <div>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
