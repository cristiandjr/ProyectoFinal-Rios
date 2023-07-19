import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";

// pages
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
  return (
    <Router>
      <div className="w-full">
        <NavBar />
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
