// libs & hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  // efectos
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  return (
    <>
      {categories.map((category) => {
        return (
          <Link
            key={category}
            className="block mt-4 p-2 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:bg-orange-300 transition duration-300 ease-in-out"
            to={`category/${category}`}
          >
            {category}
          </Link>
        );
      })}
    </>
  );
};

export default Category;
