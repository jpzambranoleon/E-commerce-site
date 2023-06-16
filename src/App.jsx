import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductPage, { CartContext } from "./pages/ProductPage";
import { useState, useEffect } from "react";
import Home from "./pages/Home";

function App() {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (item) => {
    setCartItem([...cartItem, item]);
  };

  // local storage
  useEffect(() => {
    const json = localStorage.getItem("cartItem");
    const savedCart = JSON.parse(json);
    if (savedCart) {
      setCartItem(savedCart);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(cartItem);
    localStorage.setItem("cartItem", json);
  }, [cartItem]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
          <Navbar />
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
