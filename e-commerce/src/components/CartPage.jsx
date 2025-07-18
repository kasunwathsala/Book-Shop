import { useCart } from "./CartContext";
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center p-12">
          <div className="text-8xl mb-8 animate-bounce">🛒</div>
          <h2 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-xl text-gray-400 mb-8">Looks like you haven't added anything yet</p>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <span className="mr-2">🛍️</span>
            Start Shopping
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-5xl animate-pulse">🛍️</div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
                <p className="text-gray-300 text-lg">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={clearCart}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-600">
              <div className="p-6 border-b border-gray-600 bg-gradient-to-r from-gray-700 to-gray-600">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <span className="mr-3">📦</span>
                  Your Items
                </h2>
              </div>
              
              <div className="divide-y divide-gray-600">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className="p-6 hover:bg-gray-700 transition-all duration-300 group"
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
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-300 mb-2">
                          <span className="flex items-center">
                            <span className="text-sm mr-1">💰</span>
                            Unit Price: ${item.price}
                          </span>
                          <span className="flex items-center">
                            <span className="text-sm mr-1">📦</span>
                            Category: {item.category}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-yellow-400">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="text-gray-300 text-sm font-medium">Quantity</div>
                        <div className="flex items-center space-x-3 bg-gray-700/50 rounded-xl p-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg font-bold text-lg"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-bold text-white text-xl bg-gray-600 rounded-lg py-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg font-bold text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="group/btn relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span className="flex items-center space-x-2">
                          <svg className="w-5 h-5 group-hover/btn:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove</span>
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl border border-gray-600 sticky top-8">
              <div className="p-6 border-b border-gray-600 bg-gradient-to-r from-gray-700 to-gray-600">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <span className="mr-3">🧾</span>
                  Order Summary
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center">
                    <span className="mr-2">📊</span>
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-semibold text-white text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center">
                    <span className="mr-2">🚚</span>
                    Shipping
                  </span>
                  <span className="font-semibold text-green-400">FREE</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center">
                    <span className="mr-2">🏛️</span>
                    Tax (10%)
                  </span>
                  <span className="font-semibold text-white">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-600 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-yellow-400">
                      ${(totalPrice * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Item Breakdown */}
                <div className="border-t border-gray-600 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Item Breakdown</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm text-gray-300">
                        <span className="truncate">{item.title}</span>
                        <span className="whitespace-nowrap ml-2">{item.quantity} × ${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-b-2xl">
                <Link to="/checkout">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mb-4">
                  <span className="text-xl">🚀</span>
                  <span>Proceed to Checkout</span>
                </button>
                </Link>
                
                <button className="w-full bg-transparent border-2 border-gray-500 hover:border-yellow-400 text-gray-300 hover:text-yellow-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>🛍️</span>
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-bold mb-2">Secure Checkout</h3>
            <p className="text-gray-400 text-sm">SSL encrypted payment processing</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">Free shipping on orders over $50</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600 text-center">
            <div className="text-3xl mb-3">↩️</div>
            <h3 className="text-white font-bold mb-2">Easy Returns</h3>
            <p className="text-gray-400 text-sm">30-day money back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;