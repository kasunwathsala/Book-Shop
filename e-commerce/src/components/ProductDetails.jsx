import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star, Users, Package } from "lucide-react";
import { useCart } from "./CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-purple-300" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-yellow-400 border-t-transparent mb-6"></div>
          <p className="text-3xl text-white font-bold">Loading product...</p>
          <p className="text-purple-200 mt-3 text-lg">Please wait while we fetch the amazing details</p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center p-12">
          <div className="text-8xl mb-8 animate-bounce">😔</div>
          <h2 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-xl text-red-400 mb-8">{error}</p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
            Go Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30">
            <div className="flex items-center space-x-3 text-purple-200 text-sm">
              <span className="hover:text-yellow-300 cursor-pointer transition-colors">🏠 Home</span>
              <span className="text-purple-400">•</span>
              <span className="capitalize hover:text-yellow-300 cursor-pointer transition-colors">📂 {product.category}</span>
              <span className="text-purple-400">•</span>
              <span className="text-yellow-400 truncate max-w-xs font-semibold">✨ {product.title}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-purple-200">
              <div className="relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-96 object-contain transition-all duration-500 hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setImageLoading(false)}
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-100/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>
            
            {/* Product Features */}
            <div className="bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 shadow-xl">
              <h3 className="text-white font-bold mb-6 flex items-center text-xl">
                <Package className="w-6 h-6 mr-3 text-yellow-400" />
                Product Highlights
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center text-purple-200 bg-indigo-700/50 rounded-xl p-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center text-purple-200 bg-indigo-700/50 rounded-xl p-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="font-medium">30-Day Returns</span>
                </div>
                <div className="flex items-center text-purple-200 bg-indigo-700/50 rounded-xl p-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="font-medium">Warranty Included</span>
                </div>
                <div className="flex items-center text-purple-200 bg-indigo-700/50 rounded-xl p-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-8">
            {/* Main Product Info */}
            <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-400/30">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-lg">
                  ✨ {product.category}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {product.title}
              </h1>

              {/* Rating Section */}
              <div className="flex items-center space-x-6 mb-8 bg-indigo-700/50 rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <span className="text-yellow-400 font-bold text-2xl">
                  {product.rating?.rate}
                </span>
                <div className="flex items-center text-purple-200">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{product.rating?.count} reviews</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8 bg-gradient-to-r from-indigo-700/50 to-purple-700/50 rounded-2xl p-6">
                <div className="flex items-baseline space-x-4 mb-3">
                  <span className="text-5xl font-bold text-yellow-400">
                    ${product.price}
                  </span>
                  <span className="text-purple-300 line-through text-2xl">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold px-3 py-2 rounded-full animate-pulse">
                    🔥 17% OFF
                  </span>
                </div>
                <p className="text-purple-200 text-lg">
                  💝 Inclusive of all taxes • 🚚 Free shipping on orders over $25
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full flex items-center justify-center space-x-4 py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6 ${
                  addedToCart
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black'
                }`}
              >
                <ShoppingCart size={28} />
                <span>{addedToCart ? '✅ Added to Cart!' : '🛒 Add to Cart'}</span>
              </button>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                  <span className="text-xl">❤️</span>
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center justify-center space-x-3 py-4 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                  <span className="text-xl">📤</span>
                  <span>Share Product</span>
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Product Description
              </h3>
              <p className="text-purple-100 leading-relaxed text-lg bg-indigo-700/30 rounded-xl p-6">
                {product.description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 shadow-xl">
              <h3 className="text-white font-bold mb-6 text-2xl flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                Why Shop With Us?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🔒</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Secure Payment</p>
                    <p className="text-purple-200">256-bit SSL encryption</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🚚</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Fast Delivery</p>
                    <p className="text-purple-200">2-3 business days worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Teaser */}
        <div className="mt-16 bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            🌟 Discover More Amazing Products
          </h3>
          <p className="text-purple-200 text-lg mb-6">
            Don't miss out on our other incredible deals and premium quality items
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl">
            🛍️ Browse All Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;