import { useState } from "react";

// componentes

const CartWidget = () => {
  const [showBox, setShowBox] = useState(false);

  const handleClick = () => {
    setShowBox(true);
  };

  const handleClose = () => {
    setShowBox(false);
  };

  return (
    <div className="relative">
      <button
        className="inline-flex items-center py-2 px-4 hover:bg-orange-300 transition duration-300 ease-in-out bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={handleClick}
      >
        🛒
        <p className="text-black font-bold">5</p>
      </button>
      {showBox && (
        <div
          className="fixed top-0 right-0 h-screen w-[30%] bg-gray-900 opacity-50 z-10"
          onClick={handleClose}
        ></div>
      )}
      {showBox && (
        <div className="fixed top-0 right-0 h-screen w-[30%] bg-gray-900 z-20 flex flex-col justify-center items-center p-5">
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
            onClick={handleClose}
          >
            X
          </button>
          <div>
            {/** contenidoooooooooooooo */}
            {/** contenidoooooooooooooo */}
            {/** contenidoooooooooooooo */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartWidget;
