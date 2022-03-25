import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";

const App = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || [])
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log({ products });

  
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Products products={products} />}>
        </Route >
      </Routes>
      </div>
    </Router>
  )
}

export default App;
