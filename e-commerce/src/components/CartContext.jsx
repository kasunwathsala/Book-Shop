import React, { createContext, useState, useContext } from "react";
import { Link } from "react-router-dom";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Beautiful Cart Display Component with Navbar Matching Colors
export function CartDisplay() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">🛒</div>
            <h2 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-purple-200 text-xl mb-8">Start shopping to add items to your cart!</p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
              🛍️ Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-800/90 to-purple-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-purple-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-5xl animate-pulse">🛍️</div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
                <p className="text-purple-200 text-lg">{totalItems} items in your cart</p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🗑️ Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-purple-400/30">
              <div className="p-6 border-b border-purple-400/30 bg-gradient-to-r from-indigo-700/50 to-purple-700/50">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">📦</span>
                  Your Items
                </h2>
              </div>
              <div className="divide-y divide-purple-400/20">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="p-6 hover:bg-indigo-700/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-contain rounded-xl bg-white p-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                          {item.title || item.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-purple-200">
                          <span className="flex items-center">
                            <span className="text-sm mr-1">💰</span>
                            Unit: ${item.price}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-yellow-400">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 bg-indigo-700/50 rounded-xl p-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold text-white text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden sticky top-8 border border-purple-400/30">
              <div className="p-6 border-b border-purple-400/30 bg-gradient-to-r from-indigo-700/50 to-purple-700/50">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3">🧾</span>
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center text-purple-200">
                  <span className="flex items-center">
                    <span className="mr-2">📊</span>
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-bold text-white text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-purple-200">
                  <span className="flex items-center">
                    <span className="mr-2">🚚</span>
                    Shipping
                  </span>
                  <span className="font-bold text-green-400">FREE</span>
                </div>
                
                <div className="flex justify-between items-center text-purple-200">
                  <span className="flex items-center">
                    <span className="mr-2">🏛️</span>
                    Tax (10%)
                  </span>
                  <span className="font-bold text-white">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-purple-400/30 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-yellow-400">
                      ${(totalPrice * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-indigo-700/50 to-purple-700/50">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 mb-4">
                  <span className="text-xl">🚀</span>
                  <span>Proceed to Checkout</span>
                </button>
                
                <button className="w-full bg-transparent border-2 border-purple-400/50 hover:border-yellow-400 text-purple-200 hover:text-yellow-300 font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>🛍️</span>
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-bold mb-2">Secure Payment</h3>
            <p className="text-purple-200 text-sm">Your payment information is safe with us</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-bold mb-2">Fast Delivery</h3>
            <p className="text-purple-200 text-sm">Quick and reliable shipping worldwide</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">↩️</div>
            <h3 className="text-white font-bold mb-2">Easy Returns</h3>
            <p className="text-purple-200 text-sm">30-day hassle-free return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini Cart Component for Navbar
export function MiniCart() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 text-white/90 hover:text-yellow-300 transition-colors duration-300">
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.38 2.76A1 1 0 006 17h12m-8 0a2 2 0 104 0m6 0a2 2 0 11-4 0" />
          </svg>
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {totalItems}
            </div>
          )}
        </div>
        <div className="hidden sm:block">
          <div className="text-sm font-bold">${totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}