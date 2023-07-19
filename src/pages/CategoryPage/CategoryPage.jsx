// libs & hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import CardProducts from "../../components/CardProducts/CardProducts";
import Loader from "../../components/Loader/Loader";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);

  // efecto
  useEffect(() => {
    setLoader(true);
    fetch(`https://fakestoreapi.com/products/category/${categoryId}`)
      .then((res) => res.json())
      .then((json) => {
        setCategory(json);
        setLoader(false);
      });
  }, [categoryId]);

  // filtro categorias
  const filterCategory = category.filter((category) => {
    return category.category === categoryId;
  });

  return (
    <>
      {loader ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <div className="container">
          <h2 className="ml-8 mt-10 text-3xl font-bold">
            <span className="underline text-orange-500">Categoria</span>{" "}
            {categoryId}
          </h2>
          <div className="mt-5 mb-5 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filterCategory.map((category) => {
              return (
                <div key={category.id}>
                  <CardProducts product={category} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
