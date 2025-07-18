import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Star, Heart } from "lucide-react";
import { useCart } from "./CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());
  const [likedItems, setLikedItems] = useState(new Set());
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  const toggleLike = (productId) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-purple-300" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-6 animate-pulse border border-purple-400/30">
                <div className="bg-purple-600/50 h-48 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-purple-600/50 h-4 rounded w-3/4"></div>
                  <div className="bg-purple-600/50 h-4 rounded w-1/2"></div>
                  <div className="bg-purple-600/50 h-8 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent"></div>
            <p className="text-2xl text-white font-semibold mt-4">Loading amazing products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center p-12">
          <div className="text-8xl mb-8 animate-bounce">😞</div>
          <h2 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-xl text-red-400 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
            <h1 className="text-6xl font-bold text-white mb-4">
              Our Products
              <span className="text-yellow-400">.</span>
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-6">
              Discover our amazing collection of high-quality products at unbeatable prices
            </p>
            <div className="flex items-center justify-center space-x-4 bg-indigo-700/50 rounded-xl p-4 inline-flex">
              <span className="text-purple-200">Showing</span>
              <span className="text-2xl text-yellow-400 font-bold">{products.length}</span>
              <span className="text-purple-200">premium products</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-400/30 overflow-hidden hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-400/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-white to-gray-100 m-4 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`p-2 rounded-full transition-all duration-300 shadow-lg ${
                      likedItems.has(product.id)
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Sale Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse">
                    🔥 HOT SALE
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-300 uppercase tracking-wide font-bold bg-indigo-700/50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1 bg-indigo-700/30 px-2 py-1 rounded-lg">
                    {renderStars(product.rating?.rate || 0)}
                    <span className="text-xs text-purple-200 ml-1 font-semibold">
                      ({product.rating?.count || 0})
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-purple-200 text-sm line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 bg-indigo-700/30 p-3 rounded-xl">
                  <span className="text-2xl font-bold text-yellow-400">
                    ${product.price}
                  </span>
                  <span className="text-sm text-purple-300 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full font-bold">
                    17% OFF
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </Link>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addedItems.has(product.id)}
                    className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                      addedItems.has(product.id)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black transform hover:scale-105'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {addedItems.has(product.id) ? 'Added!' : 'Add'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Hover Effect Bottom Border */}
              <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
            <div className="text-purple-200 text-lg">
              <span className="text-white font-bold text-2xl">{products.length}</span> premium products loaded
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2">
              <span>🚀</span>
              <span>Load More Products</span>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-white font-bold text-xl mb-2">Free Delivery</h3>
            <p className="text-purple-200">Fast and reliable shipping worldwide</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-white font-bold text-xl mb-2">Secure Payment</h3>
            <p className="text-purple-200">Your transactions are safe with us</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-white font-bold text-xl mb-2">Quality Products</h3>
            <p className="text-purple-200">Premium quality guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;