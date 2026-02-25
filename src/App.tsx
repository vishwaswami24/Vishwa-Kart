// ============================================
// IMPORTS
// ============================================
import { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Star, X, Menu, ArrowRight, Sun, Moon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

// ============================================
// TYPE DEFINITIONS
// ============================================
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

export default function VishwaEcommerce() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ============================================
  // PRODUCT DATA
  // ============================================
  const products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 4999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', rating: 4.5, reviews: 128, category: 'Audio' },
    { id: 2, name: 'Smart Watch', price: 8999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', rating: 4.8, reviews: 256, category: 'Wearables' },
    { id: 3, name: 'USB-C Cable', price: 599, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop', rating: 4.3, reviews: 89, category: 'Cables' },
    { id: 4, name: 'Phone Case', price: 1299, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop', rating: 4.6, reviews: 342, category: 'Protection' },
    { id: 5, name: 'Screen Protector', price: 399, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&h=500&fit=crop', rating: 4.4, reviews: 156, category: 'Protection' },
    { id: 6, name: 'Power Bank', price: 2499, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop', rating: 4.7, reviews: 201, category: 'Power' },
    { id: 7, name: 'Bluetooth Speaker', price: 3499, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop', rating: 4.9, reviews: 178, category: 'Audio' },
    { id: 8, name: 'Phone Stand', price: 799, image: 'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=500&h=500&fit=crop', rating: 4.5, reviews: 94, category: 'Accessories' },
  ];

  // ============================================
  // CART & WISHLIST FUNCTIONS
  // ============================================
  const addToCart = (product: Product) => setCart([...cart, product]);
  const toggleWishlist = (productId: number) => {
    setWishlist(wishlist.includes(productId) ? wishlist.filter(id => id !== productId) : [...wishlist, productId]);
  };
  const removeFromCart = (index: number) => setCart(cart.filter((_, i) => i !== index));

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================
  // HEADER COMPONENT
  // ============================================
  const Header = () => (
      <div className={`${isDarkMode ? 'bg-black/80 text-white border-gray-800' : 'bg-white/80 text-black border-gray-200'} fixed top-0 w-full z-50 border-b backdrop-blur-xl transition-all shadow-lg ${isDarkMode ? 'shadow-[#26848c]/5' : 'shadow-gray-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentPage('home')}>
              <img src="/logo2.png" alt="Vishwa Logo" className="h-17 group- transition-transform" />
            </div>
  
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'products', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  title={page}
                  onClick={() => setCurrentPage(page)}
                  className={`capitalize text-sm font-medium transition-colors ${currentPage === page ? 'text-[#26848c]' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                >
                  {page}
                </button>
              ))}
            </div>
  
            <div className="flex items-center gap-4">
              {/* Icons */}
              <button aria-label="Wishlist" title="Wishlist" className={`relative p-2 rounded-full transition ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`} onClick={() => setCurrentPage('wishlist')}>
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && <span className="absolute top-0 right-0 bg-[#26848c] text-xs rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">{wishlist.length}</span>}
              </button>
              <button aria-label="Open cart" title="Cart" className={`relative p-2 rounded-full transition ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`} onClick={() => setCurrentPage('cart')}>
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && <span className="absolute top-0 right-0 bg-[#26848c] text-xs rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">{cart.length}</span>}
              </button>
              <button aria-label="Account" title="Account" className={`p-2 rounded-full transition hidden md:block ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                <User className="w-5 h-5" />
              </button>
              <button
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu */}
              <button aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} title={mobileMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
  
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 space-y-3 border-t pt-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
              {['home', 'products', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  aria-label={page}
                  title={page}
                  onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
                  className={`block w-full text-left capitalize text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );

  // ============================================
  // HOME PAGE COMPONENT
  // ============================================
  const HomePage = () => (
    <div className="pt-20">
      {/* Hero Section */}
      <div className={`relative overflow-hidden min-h-screen flex items-center ${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'}`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#26848c] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1e6b73] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className={`inline-block px-4 py-2 rounded-full border ${isDarkMode ? 'bg-[#26848c]/10 border-[#26848c]/30 text-[#26848c]' : 'bg-emerald-50 border-emerald-200 text-emerald-600'} text-sm font-semibold backdrop-blur-sm`}>
                ✨ New Collection 2025
              </div>
              <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Premium Tech <span className="bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-purple-400 bg-clip-text text-transparent animate-gradient">Essentials</span>
              </h1>
              <p className={`text-lg md:text-xl mb-8 max-w-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover a curated collection of high-quality gadgets and accessories designed to elevate your digital lifestyle.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('products')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#26848c]/50 transition-all group  animate-gradient"
                >
                  Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={() => setCurrentPage('about')}
                  className={`inline-flex items-center gap-2 border-2 font-bold px-8 py-4 rounded-full transition-all  ${isDarkMode ? 'border-gray-700 text-white hover:border-[#26848c]/50 hover:bg-[#26848c]/10' : 'border-gray-300 text-black hover:border-[#26848c] hover:bg-emerald-50'}`}
                >
                  Learn More
                </button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>10K+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Happy Customers</div>
                </div>
                <div className={`w-px h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                <div>
                  <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>500+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Products</div>
                </div>
                <div className={`w-px h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                <div>
                  <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>4.9★</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=800&fit=crop" 
                  alt="Premium Tech Products" 
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl group- transition-transform duration-500" 
                />
                <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity ${isDarkMode ? 'bg-gradient-to-r from-[#26848c] to-[#1e6b73]' : 'bg-gradient-to-r from-[#3a9ca5] to-green-300'}`}></div>
              </div>
              {/* Floating Cards */}
              <div className={`absolute top-10 -left-10 p-4 rounded-2xl backdrop-blur-xl border ${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white/50 border-gray-200'} shadow-xl animate-bounce-slow`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#26848c] to-[#1e6b73] flex items-center justify-center text-white font-bold">🎧</div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Seller</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Headphones</div>
                  </div>
                </div>
              </div>
              <div className={`absolute bottom-10 -right-10 p-4 rounded-2xl backdrop-blur-xl border ${isDarkMode ? 'bg-black/50 border-gray-800' : 'bg-white/50 border-gray-200'} shadow-xl`} style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">⌚</div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Trending</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Smart Watch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-t py-24`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Quick delivery within 24 hours', color: 'from-yellow-500 to-orange-500' },
              { icon: '🔒', title: 'Secure & Safe', desc: 'End-to-end encrypted transactions', color: 'from-[#1e6b73] to-[#26848c]' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing and regular deals', color: 'from-[#26848c] to-blue-500' },
            ].map((feature, i) => (
              <div key={i} className={`group relative border p-8 rounded-2xl hover:border-[#26848c]/50 transition-all overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:shadow-2xl hover:shadow-[#26848c]/20' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-xl'} `}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative">
                  <div className="text-5xl mb-4 group- transition-transform">{feature.icon}</div>
                  <h3 className={`font-bold mb-2 text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{feature.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} py-24`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Featured Collection</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // PRODUCT CARD COMPONENT (Reusable)
  // ============================================
  const ProductCard = ({ product }: { product: Product }) => (
      <div className={`group border rounded-2xl overflow-hidden hover:border-[#26848c]/50 hover:shadow-2xl transition-all  ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:shadow-[#26848c]/20' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-[#26848c]/10'}`}>
        <div className={`relative h-56 flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-gray-100 via-gray-50 to-white'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#26848c]/5 to-[#1e6b73]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group- transition-transform duration-500" />
          <button
            aria-label={`Toggle wishlist for ${product.name}`}
            title={`Toggle wishlist for ${product.name}`}
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-xl border transition-all  ${
              wishlist.includes(product.id) ? 'bg-[#26848c]/30 border-[#26848c] text-[#26848c] shadow-lg shadow-[#26848c]/50' : isDarkMode ? 'bg-black/50 border-gray-700 text-gray-400 hover:border-[#26848c]/50' : 'bg-white/70 border-gray-300 text-gray-600 hover:border-[#26848c]'
            }`}
          >
            <Heart className="w-4 h-4" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-6">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${isDarkMode ? 'bg-[#26848c]/10 text-[#26848c]' : 'bg-emerald-50 text-emerald-600'}`}>{product.category}</span>
          <h3 className={`font-bold mt-3 text-lg line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{product.name}</h3>
          <div className="flex items-center gap-2 mt-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>({product.reviews})</span>
          </div>
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-3xl font-black bg-gradient-to-r from-[#26848c] to-[#1e6b73] bg-clip-text text-transparent">₹{product.price}</span>
            </div>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold py-3 rounded-xl hover:shadow-xl hover:shadow-[#26848c]/50 transition-all text-sm  animate-gradient"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );

  // ============================================
  // PRODUCTS PAGE COMPONENT
  // ============================================
  const ProductsPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>All Products</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full"></div>
          <p className={`mt-4 text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explore our complete collection of premium tech accessories</p>
          
          {/* Search Bar */}
          <div className={`flex items-center rounded-2xl px-6 py-4 border transition-all max-w-2xl ${isDarkMode ? 'bg-gray-900/50 border-gray-800 hover:border-[#26848c]/50' : 'bg-gray-100/50 border-gray-300 hover:border-[#26848c]'}`}>
            <Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`} />
            <input 
              type="text" 
              placeholder="Search by product name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none ml-3 text-base w-full ${isDarkMode ? 'placeholder-gray-600 text-white' : 'placeholder-gray-500 text-black'}`} 
            />
          </div>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <Search className={`w-24 h-24 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
            <p className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>No products found</p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ============================================
  // WISHLIST PAGE COMPONENT
  // ============================================
  const WishlistPage = () => {
    const wishedProducts = products.filter(product => wishlist.includes(product.id));
    return (
      <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h1 className={`text-5xl md:text-6xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>My Wishlist</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full"></div>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your favorite products saved for later</p>
          </div>
          {wishedProducts.length === 0 ? (
            <div className="text-center py-24">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <Heart className={`w-20 h-16 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
              </div>
              <p className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Your wishlist is empty</p>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start adding products you love</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#26848c]/50 transition-all  animate-gradient"
              >
                Browse Products <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // CART PAGE COMPONENT
  // ============================================
  const CartPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className={`text-5xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Shopping Cart</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full"></div>
        </div>
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <ShoppingCart className={`w-20 h-16 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
            </div>
            <p className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Your cart is empty</p>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Add some products to get started</p>
            <button
              onClick={() => setCurrentPage('products')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#26848c]/50 transition-all  animate-gradient"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <div key={i} className={`relative border p-6 rounded-2xl flex items-center justify-between group hover:border-[#26848c]/50 transition-all overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black border-gray-800 hover:shadow-xl hover:shadow-[#26848c]/10' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:shadow-lg'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#26848c]/5 to-[#1e6b73]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-50'}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.name}</h3>
                      <p className="text-[#26848c] font-black text-2xl">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    title="Remove item"
                    onClick={() => removeFromCart(i)}
                    className={`relative z-10 p-3 hover:bg-red-500/20 rounded-xl transition-all  ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-400'}`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
            <div className={`border rounded-2xl p-8 h-fit sticky top-24 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 shadow-xl shadow-[#26848c]/5' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg'}`}>
              <h2 className={`text-3xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Order Summary</h2>
              <div className={`space-y-4 mb-6 pb-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className={`flex justify-between text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <div className={`flex justify-between text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>Shipping:</span>
                  <span className="text-[#1e6b73] font-bold">FREE</span>
                </div>
                <div className={`flex justify-between text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>Tax:</span>
                  <span className="font-semibold">₹0</span>
                </div>
              </div>
              <div className={`flex justify-between font-black text-2xl mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <span>Total:</span>
                <span className="bg-gradient-to-r from-[#26848c] to-[#1e6b73] bg-clip-text text-transparent">₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-[#26848c]/50 transition-all mb-3  animate-gradient">
                Proceed to Checkout
              </button>
              <button
                onClick={() => setCurrentPage('products')}
                className={`w-full border-2 py-4 rounded-xl hover:border-[#26848c]/50 transition-all font-bold ${isDarkMode ? 'border-gray-700 text-white hover:bg-[#26848c]/5' : 'border-gray-300 text-black hover:bg-emerald-50'}`}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ============================================
  // ABOUT PAGE COMPONENT
  // ============================================
  const AboutPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>About Vishwa</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&h=600&fit=crop" alt="Global Business" className="w-64 h-64 object-cover rounded-3xl shadow-xl mb-6" />
            <h2 className={`text-4xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Our Story</h2>
            <p className={`mb-4 leading-relaxed text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vishwa was founded with a mission to bring premium tech accessories to customers worldwide. We believe in quality, innovation, and exceptional customer experiences.</p>
            <p className={`leading-relaxed text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Our name "Vishwa" means "world" in Sanskrit, reflecting our global vision and commitment to serving customers across the globe with authentic, premium products.</p>
            <div className="mt-8 flex gap-4">
              <button onClick={() => setCurrentPage('products')} className="bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-[#26848c]/50 transition-all  animate-gradient">
                Shop Now
              </button>
              <button onClick={() => setCurrentPage('contact')} className={`border-2 font-bold px-6 py-3 rounded-xl transition-all  ${isDarkMode ? 'border-gray-700 text-white hover:border-[#26848c]/50 hover:bg-[#26848c]/5' : 'border-gray-300 text-black hover:border-[#26848c] hover:bg-emerald-50'}`}>
                Contact Us
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'To provide premium tech accessories that enhance daily life at affordable prices with exceptional quality and service.' },
              { icon: '🔭', title: 'Our Vision', desc: 'To become the most trusted e-commerce platform for quality gadgets globally, setting new standards in customer satisfaction.' },
              { icon: '✨', title: 'Our Values', desc: 'Quality, integrity, customer-first approach, continuous innovation, and sustainable business practices.' },
            ].map((item, i) => (
              <div key={i} className={`relative border p-8 rounded-2xl backdrop-blur-sm overflow-hidden group hover:border-[#26848c]/50 transition-all  ${isDarkMode ? 'bg-gradient-to-br from-[#26848c]/5 to-[#1e6b73]/5 border-[#26848c]/20 hover:shadow-xl hover:shadow-[#26848c]/10' : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:shadow-lg'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#26848c]/10 to-[#1e6b73]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-[#26848c] mb-3">{item.title}</h3>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // CONTACT PAGE COMPONENT
  // ============================================
  const ContactPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Get in Touch</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mx-auto mb-4"></div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            { icon: '📱', title: 'Phone', content: ['+91 1234 567 890', 'Mon-Sat, 9AM-6PM'], color: 'from-green-500 to-emerald-500', link: 'tel:+911234567890' },
            { icon: '✉️', title: 'Email', content: ['support@vishwa.com', 'We reply within 24 hours'], color: 'from-blue-500 to-[#26848c]', link: 'mailto:support@vishwa.com' },
            { icon: '📍', title: 'Address', content: ['123 Tech Street, Innovation Hub', 'Mumbai, Maharashtra 400001'], color: 'from-purple-500 to-pink-500', link: null },
          ].map((item, i) => (
            <div key={i} className={`group relative border p-8 rounded-2xl overflow-hidden transition-all ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:shadow-xl hover:shadow-[#26848c]/10' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-lg'}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className="relative text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className={`font-bold mb-3 text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
                {item.content.map((line, j) => (
                  item.link && j === 0 ? (
                    <a key={j} href={item.link} className={`block text-base mb-1 text-[#26848c] hover:text-[#3a9ca5] transition font-medium`}>{line}</a>
                  ) : (
                    <p key={j} className={`text-base mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{line}</p>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`border rounded-2xl p-8 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 shadow-xl shadow-[#26848c]/5' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Send us a Message</h2>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>First Name *</label>
                  <input type="text" placeholder="John" required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Name *</label>
                  <input type="text" placeholder="Doe" required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email Address *</label>
                <input type="email" placeholder="john@example.com" required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone Number</label>
                <input type="tel" placeholder="+91 1234 567 890" className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subject *</label>
                <input type="text" placeholder="How can we help you?" required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your Message *</label>
                <textarea placeholder="Tell us more about your inquiry..." rows={6} required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition resize-none`}></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-[#26848c]/50 transition-all animate-gradient">Send Message</button>
            </form>
          </div>

          <div className="space-y-8">
            <div className={`border rounded-2xl p-8 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Business Hours</h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{schedule.day}</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`border rounded-2xl p-8 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>FAQ</h3>
              <div className="space-y-4">
                {[
                  { q: 'What is your return policy?', a: '30-day money-back guarantee on all products.' },
                  { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide.' },
                  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days.' },
                ].map((faq, i) => (
                  <div key={i}>
                    <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{faq.q}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // PRIVACY POLICY PAGE COMPONENT
  // ============================================
  const PrivacyPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Privacy Policy</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-8"></div>
        <p className={`text-sm mb-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Last updated: January 2025</p>
        
        <div className="space-y-8">
          {[
            { title: 'Information We Collect', content: 'We collect information you provide directly to us, including name, email, phone number, and payment details when you make a purchase or create an account.' },
            { title: 'How We Use Your Information', content: 'We use your information to process orders, communicate with you, improve our services, and provide customer support.' },
            { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction.' },
            { title: 'Cookies', content: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.' },
            { title: 'Your Rights', content: 'You have the right to access, update, or delete your personal information at any time by contacting us.' },
          ].map((section, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{section.title}</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // TERMS & CONDITIONS PAGE COMPONENT
  // ============================================
  const TermsPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Terms & Conditions</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-8"></div>
        <p className={`text-sm mb-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Last updated: January 2025</p>
        
        <div className="space-y-8">
          {[
            { title: 'Acceptance of Terms', content: 'By accessing and using Vishwa-Kart, you accept and agree to be bound by these terms and conditions.' },
            { title: 'Products & Pricing', content: 'All products are subject to availability. Prices are subject to change without notice. We reserve the right to limit quantities.' },
            { title: 'Orders & Payment', content: 'All orders are subject to acceptance and availability. Payment must be received before order processing.' },
            { title: 'Shipping & Delivery', content: 'We aim to deliver within the specified timeframe. Delivery times may vary based on location and product availability.' },
            { title: 'Returns & Refunds', content: 'Products can be returned within 7 days of delivery. Items must be unused and in original packaging.' },
          ].map((section, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{section.title}</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // TRACK ORDER PAGE COMPONENT
  // ============================================
  const TrackOrderPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Track Your Order</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        <div className={`border rounded-2xl p-8 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
          <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enter your order details to track your shipment</p>
          <form className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Order ID *</label>
              <input type="text" placeholder="e.g., VK123456789" required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email Address *</label>
              <input type="email" placeholder="your@email.com" required className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`} />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#26848c] via-[#1e6b73] to-[#26848c] bg-[length:200%_100%] text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-[#26848c]/50 transition-all animate-gradient">Track Order</button>
          </form>
        </div>
      </div>
    </div>
  );

  // ============================================
  // RETURNS PAGE COMPONENT
  // ============================================
  const ReturnsPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Returns & Refunds</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        <div className="space-y-8">
          {[
            { title: 'Return Policy', content: 'We offer a 30-day return policy on all products. Items must be unused and in original packaging with all tags attached.' },
            { title: 'How to Return', content: 'Contact our support team with your order number. We\'ll provide a return shipping label and instructions.' },
            { title: 'Refund Process', content: 'Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method.' },
            { title: 'Non-Returnable Items', content: 'Opened software, gift cards, and personalized items cannot be returned for hygiene and security reasons.' },
          ].map((section, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{section.title}</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // FAQ PAGE COMPONENT
  // ============================================
  const FAQPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Frequently Asked Questions</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        <div className="space-y-6">
          {[
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, net banking, and digital wallets.' },
            { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery at checkout.' },
            { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by location.' },
            { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee. Items must be unused and in original packaging.' },
            { q: 'How can I track my order?', a: 'You\'ll receive a tracking number via email once your order ships. Use it on our Track Order page.' },
            { q: 'Are your products genuine?', a: 'Yes, all our products are 100% authentic and sourced directly from authorized distributors.' },
            { q: 'Do you offer warranty?', a: 'All products come with manufacturer warranty. Extended warranty options are available at checkout.' },
            { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 24 hours of placement. Contact support immediately for assistance.' },
          ].map((faq, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{faq.q}</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // HELP CENTER PAGE COMPONENT
  // ============================================
  const HelpCenterPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Help Center</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '📦', title: 'Orders & Shipping', desc: 'Track orders, shipping info, delivery times', page: 'track order' },
            { icon: '↩️', title: 'Returns & Refunds', desc: 'Return policy, refund process, exchanges', page: 'returns' },
            { icon: '❓', title: 'FAQ', desc: 'Common questions and answers', page: 'faq' },
            { icon: '💳', title: 'Payment', desc: 'Payment methods, billing, invoices', page: 'payment' },
            { icon: '🔒', title: 'Account & Security', desc: 'Login issues, password reset, privacy', page: 'account' },
            { icon: '📞', title: 'Contact Support', desc: 'Get in touch with our team', page: 'contact' },
          ].map((item, i) => (
            <div key={i} onClick={() => item.page && setCurrentPage(item.page)} className={`border p-8 rounded-2xl text-center transition-all ${item.page ? 'cursor-pointer hover:border-[#26848c]/50' : ''} ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:shadow-xl hover:shadow-[#26848c]/10' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-lg'}`}>
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // PAYMENT PAGE COMPONENT
  // ============================================
  const PaymentPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Payment Information</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        <div className="space-y-8">
          {[
            { title: 'Accepted Payment Methods', content: 'We accept Visa, Mastercard, American Express, Discover, debit cards, UPI, net banking, and popular digital wallets like PayPal, Google Pay, and Apple Pay.' },
            { title: 'Payment Security', content: 'All transactions are encrypted using SSL technology. We never store your complete card details on our servers. Your payment information is processed securely through certified payment gateways.' },
            { title: 'Billing Information', content: 'Your billing address must match the address on file with your card issuer. Invoices are automatically sent to your email after successful payment.' },
            { title: 'Payment Issues', content: 'If your payment fails, verify your card details, ensure sufficient funds, and check with your bank. Contact support if issues persist.' },
            { title: 'Currency & Pricing', content: 'All prices are displayed in INR (₹). International cards are accepted and converted at current exchange rates by your card issuer.' },
          ].map((section, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{section.title}</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // ACCOUNT & SECURITY PAGE COMPONENT
  // ============================================
  const AccountSecurityPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Account & Security</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        <div className="space-y-8">
          {[
            { title: 'Creating an Account', content: 'Sign up with your email address to track orders, save addresses, view order history, and get personalized recommendations. Account creation is free and takes less than a minute.' },
            { title: 'Password Reset', content: 'Forgot your password? Click "Forgot Password" on the login page. Enter your email and we\'ll send a reset link. For security, links expire after 24 hours.' },
            { title: 'Account Security', content: 'Use a strong, unique password with at least 8 characters including letters, numbers, and symbols. Enable two-factor authentication for added security. Never share your password.' },
            { title: 'Privacy & Data', content: 'We protect your personal information with industry-standard encryption. Your data is never sold to third parties. Review our Privacy Policy for complete details.' },
            { title: 'Managing Your Account', content: 'Update your profile, addresses, and preferences anytime from your account dashboard. You can also view order history, track shipments, and manage saved payment methods.' },
            { title: 'Account Deletion', content: 'To delete your account, contact our support team. Note that order history and transaction records may be retained for legal and accounting purposes.' },
          ].map((section, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{section.title}</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // SITEMAP PAGE COMPONENT
  // ============================================
  const SitemapPage = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'} min-h-screen pt-24 pb-24`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Sitemap</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#26848c] to-[#1e6b73] rounded-full mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Main Pages', links: [{ name: 'Home', page: 'home' }, { name: 'Products', page: 'products' }, { name: 'About', page: 'about' }, { name: 'Contact', page: 'contact' }] },
            { title: 'Shop', links: [{ name: 'Wishlist', page: 'wishlist' }, { name: 'Cart', page: 'cart' }] },
            { title: 'Legal', links: [{ name: 'Privacy Policy', page: 'privacy' }, { name: 'Terms & Conditions', page: 'terms' }] },
            { title: 'Support', links: [{ name: 'Track Order', page: 'track order' }, { name: 'Returns', page: 'returns' }, { name: 'FAQ', page: 'faq' }, { name: 'Help Center', page: 'help center' }] },
          ].map((section, i) => (
            <div key={i} className={`border p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    {link.page ? (
                      <button 
                        onClick={() => setCurrentPage(link.page)} 
                        className={`text-sm hover:text-[#26848c] transition flex items-center gap-2 group ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition">→</span> {link.name}
                      </button>
                    ) : (
                      <span className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                        <span className="opacity-0">→</span> {link.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // FOOTER COMPONENT
  // ============================================
  const Footer = () => (
    <div className={`${isDarkMode ? 'bg-gradient-to-b from-black to-gray-900 border-gray-800' : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Newsletter Section */}
        <div className={`mb-12 p-8 rounded-2xl border ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black border-gray-800' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Subscribe to Our Newsletter</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get the latest updates on new products and exclusive offers!</p>
            </div>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={`flex-1 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-black placeholder-gray-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#26848c] focus:ring-2 focus:ring-[#26848c]/20 transition`}
              />
              <button className="bg-gradient-to-r from-[#26848c] to-[#1e6b73] text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#26848c]/50 transition-all">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo2.png" alt="Vishwa Logo" className="h-12" />
            </div>
            <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Premium tech accessories that enhance your digital lifestyle with quality and innovation. Your trusted partner for all tech needs.</p>
            <div className="flex gap-3 mb-6">
              {[
                { icon: faFacebookF, label: 'Facebook', url: 'https://www.facebook.com/vishwa.swami.739266/' },
                { icon: faTwitter, label: 'X', url: 'https://x.com/vishwaswami24' },
                { icon: faInstagram, label: 'Instagram', url: 'https://www.instagram.com/__vishwa_24/' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`w-11 h-11 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white hover:bg-gradient-to-br hover:from-[#26848c] hover:to-[#1e6b73]' : 'bg-gray-100 border-gray-300 text-black hover:bg-gradient-to-br hover:from-[#26848c] hover:to-[#1e6b73]'} border rounded-xl hover:border-[#26848c]/50 hover:text-white transition-all flex items-center justify-center hover:shadow-lg hover:shadow-[#26848c]/30`}
                >
                  <FontAwesomeIcon icon={s.icon} />
                  <span className="sr-only">{s.label}</span>
                </a>
              ))}
            </div>
            <div className="flex gap-3">
              <FontAwesomeIcon icon={faCcVisa} className="text-4xl text-blue-600" />
              <FontAwesomeIcon icon={faCcMastercard} className="text-4xl text-red-600" />
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Products', 'About', 'Contact'].map((link) => (
                <li key={link}><button title={link} onClick={() => setCurrentPage(link.toLowerCase())} className={`text-sm hover:text-[#26848c] transition flex items-center gap-2 group ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><span className="opacity-0 group-hover:opacity-100 transition group-hover:translate-x-1">→</span> {link}</button></li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Support</h4>
            <ul className="space-y-3">
              {[{ name: 'Track Order', page: 'track order' }, { name: 'Returns', page: 'returns' }, { name: 'FAQ', page: 'faq' }, { name: 'Help Center', page: 'help center' }].map((link) => (
                <li key={link.name}><button title={link.name} onClick={() => setCurrentPage(link.page)} className={`text-sm hover:text-[#26848c] transition flex items-center gap-2 group ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><span className="opacity-0 group-hover:opacity-100 transition group-hover:translate-x-1">→</span> {link.name}</button></li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Contact</h4>
            <div className="space-y-4">
              <div>
                <p className={`text-xs uppercase tracking-wider mb-2 font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Email</p>
                <a href="mailto:support@vishwa.com" className="text-[#26848c] text-sm hover:text-[#3a9ca5] transition block font-medium">support@vishwa.com</a>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wider mb-2 font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Phone</p>
                <a href="tel:+911234567890" className="text-[#26848c] text-sm hover:text-[#3a9ca5] transition block font-medium">+91 1234 567 890</a>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wider mb-2 font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Address</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t py-6 px-4 md:px-6 ${isDarkMode ? 'border-gray-800 bg-black/50' : 'border-gray-200 bg-gray-50/50'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>&copy; 2025 Vishwa. All rights reserved.</p>
          <div className="flex gap-6">
            <button title="Privacy Policy" onClick={() => setCurrentPage('privacy')} className={`text-xs hover:text-[#26848c] transition ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Privacy Policy</button>
            <button title="Terms & Conditions" onClick={() => setCurrentPage('terms')} className={`text-xs hover:text-[#26848c] transition ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Terms & Conditions</button>
            <button title="Sitemap" onClick={() => setCurrentPage('sitemap')} className={`text-xs hover:text-[#26848c] transition ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Sitemap</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // MAIN APP RENDER
  // ============================================
  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col transition-colors`}>
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'sitemap' && <SitemapPage />}
        {currentPage === 'track order' && <TrackOrderPage />}
        {currentPage === 'returns' && <ReturnsPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'help center' && <HelpCenterPage />}
        {currentPage === 'payment' && <PaymentPage />}
        {currentPage === 'account' && <AccountSecurityPage />}
      </main>
      <Footer />
    </div>
  );
}

