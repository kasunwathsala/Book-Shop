import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from "./components/CartContext";

function App() {
  return (
    <CartProvider>
      {" "}
      <Router>
        <Navbar />
        <div className="px-4 py-6">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />{" "}
            <Route path="/checkout" element={<CheckoutPage />} />
           
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
