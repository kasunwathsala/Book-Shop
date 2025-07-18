import React, { useState } from "react";
import { useCart } from "./CartContext";

function CheckoutPage() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    // Clear cart after order
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center p-12">
          <div className="text-8xl mb-8">🛒</div>
          <h2 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-xl text-purple-200 mb-8">Add some products to proceed to checkout</p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center p-12">
          <div className="text-8xl mb-8 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h2>
          <p className="text-xl text-purple-200 mb-6">Thank you for your purchase. Your order is being processed.</p>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 inline-block mb-8">
            <p className="text-white text-lg mb-2">📧 Confirmation email sent to: <span className="text-yellow-400">{formData.email}</span></p>
            <p className="text-purple-200">🚚 Expected delivery: 2-3 business days</p>
          </div>
          <div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl mr-4">
              🛍️ Continue Shopping
            </button>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-xl">
              📋 Track Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  const taxAmount = totalPrice * 0.1;
  const finalTotal = totalPrice + taxAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              🛒 Checkout
              <span className="text-yellow-400">.</span>
            </h1>
            <p className="text-xl text-purple-200">
              Complete your order and get ready for amazing products!
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="07123456789"
                    />
                  </div>
                </div>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="123 Main Street,colombo 07"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        placeholder="Matara"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        placeholder="15862"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="JP">Japan</option>
                        <option value="SL">Sri Lanka</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">💳</span>
                  Payment Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="kasun nilaweera"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        placeholder="MM/YY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-indigo-700/50 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-400/30 sticky top-8">
                <div className="p-6 border-b border-purple-400/30">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="text-2xl mr-3">🧾</span>
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 bg-indigo-700/30 rounded-xl p-3">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                        />
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm truncate">{item.title}</p>
                          <p className="text-purple-200 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-yellow-400 font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Totals */}
                  <div className="space-y-3 pt-4 border-t border-purple-400/30">
                    <div className="flex justify-between text-purple-200">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-purple-200">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-purple-200">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white border-t border-purple-400/30 pt-3">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-2xl font-bold text-yellow-400">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-indigo-700/50 to-purple-700/50">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span className="text-xl">🚀</span>
                    <span>Place Order</span>
                  </button>
                  
                  {/* Security Info */}
                  <div className="mt-4 text-center text-purple-200 text-sm">
                    <p className="flex items-center justify-center space-x-2">
                      <span>🔒</span>
                      <span>Secure 256-bit SSL encryption</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-bold mb-2">Secure Payment</h3>
            <p className="text-purple-200 text-sm">Bank-level security</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="text-white font-bold mb-2">Fast Shipping</h3>
            <p className="text-purple-200 text-sm">2-3 day delivery</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">↩️</div>
            <h3 className="text-white font-bold mb-2">Easy Returns</h3>
            <p className="text-purple-200 text-sm">30-day guarantee</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 text-center">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="text-white font-bold mb-2">24/7 Support</h3>
            <p className="text-purple-200 text-sm">Always here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;