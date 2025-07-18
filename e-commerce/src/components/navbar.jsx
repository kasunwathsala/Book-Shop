import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { totalItems, totalPrice } = useCart();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl border-b-2 border-purple-300/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="group flex items-center space-x-3 text-2xl font-bold text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <span className="text-4xl animate-bounce">🛒</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent font-extrabold">
              MiniShop
            </span>
            <span className="text-sm bg-gradient-to-r from-pink-400 to-red-400 px-2 py-1 rounded-full text-xs font-semibold">
              SHOP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="relative group px-5 py-3 text-white/90 hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2 font-medium">
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></div>
              <div className="absolute inset-0 bg-white/10 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-200"></div>
            </Link>
            
            <Link 
              to="/cart" 
              className="relative group px-5 py-3 text-white/90 hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2 font-medium">
                <div className="relative">
                  <span className="text-lg">🛍️</span>
                  {/* Cart Count Badge */}
                  {totalItems > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </div>
                  )}
                </div>
                <span>Cart</span>
                {/* Price Display for larger screens */}
                {totalItems > 0 && (
                  <span className="hidden lg:inline text-sm text-yellow-300 font-bold">
                    (${totalPrice.toFixed(2)})
                  </span>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></div>
              <div className="absolute inset-0 bg-white/10 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-200"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="group p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300">
              <svg className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-6 pt-6 border-t border-white/20">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="group flex items-center space-x-3 px-4 py-4 text-white/90 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-xl">🏠</span>
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="group flex items-center justify-between px-4 py-4 text-white/90 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-xl">🛍️</span>
                  {/* Mobile Cart Count Badge */}
                  {totalItems > 0 && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </div>
                  )}
                </div>
                <span className="font-medium">Shopping Cart</span>
              </div>
              {/* Mobile Price Display */}
              {totalItems > 0 && (
                <div className="text-right">
                  <div className="text-yellow-300 font-bold text-sm">
                    ${totalPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-white/70">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"></div>
    </nav>
  );
}