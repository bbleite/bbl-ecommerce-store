import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Basket from "./components/Basket";

const App = () => {

  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  }

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  }

  const addProduct = async () => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  }

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(
      //   checkoutId,
      //   orderData
      // );

      setOrderInfo(orderData);

      refreshBasket();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };


  useEffect(() => {
    fetchProducts();
    fetchBasketData();
  }, []);
  console.log({ products });


  return (
    <Router>
      <div>
        <NavBar basketItems={basketData.total_items} />
        <Routes>
          <Route path="/" element={<Products products={products} addProduct={addProduct} />}>
          </Route >
          <Route path="/basket" element=
            {
              <Basket
                basketData={basketData}
                updateProduct={updateProduct}
                handleEmptyBasket={handleEmptyBasket}
                RemoveItemFromBasket={RemoveItemFromBasket} />
            }>
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
