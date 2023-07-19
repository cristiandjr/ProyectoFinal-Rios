// components
import ItemListContainer from "../../components/ItemListContainer/ItemListContainer";

const HomePage = () => {
  return (
    <div className="container">
      <h2 className="ml-8 mt-10 text-3xl font-bold">
        <span className="underline text-orange-500">Recomendados</span> del día
      </h2>
      <div className="mt-5 mb-10 h-px mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ItemListContainer />
      </div>
    </div>
  );
};

export default HomePage;
