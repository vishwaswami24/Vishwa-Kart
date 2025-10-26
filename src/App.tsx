import { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Star, X, Menu, ArrowRight, Sun, Moon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

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
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 4999, image: '🎧', rating: 4.5, reviews: 128, category: 'Audio' },
    { id: 2, name: 'Smart Watch', price: 8999, image: '⌚', rating: 4.8, reviews: 256, category: 'Wearables' },
    { id: 3, name: 'USB-C Cable', price: 599, image: '🔌', rating: 4.3, reviews: 89, category: 'Cables' },
    { id: 4, name: 'Phone Case', price: 1299, image: '📱', rating: 4.6, reviews: 342, category: 'Protection' },
    { id: 5, name: 'Screen Protector', price: 399, image: '🛡️', rating: 4.4, reviews: 156, category: 'Protection' },
    { id: 6, name: 'Power Bank', price: 2499, image: '🔋', rating: 4.7, reviews: 201, category: 'Power' },
    { id: 7, name: 'Bluetooth Speaker', price: 3499, image: '🔊', rating: 4.9, reviews: 178, category: 'Audio' },
    { id: 8, name: 'Phone Stand', price: 799, image: '🖥️', rating: 4.5, reviews: 94, category: 'Accessories' },
  ];

  const addToCart = (product: Product) => setCart([...cart, product]);
  const toggleWishlist = (productId: number) => {
    setWishlist(wishlist.includes(productId) ? wishlist.filter(id => id !== productId) : [...wishlist, productId]);
  };
  const removeFromCart = (index: number) => setCart(cart.filter((_, i) => i !== index));

  // Modern Header
    const Header = () => (
      <div className={`${isDarkMode ? 'bg-black text-white border-gray-800' : 'bg-white text-black border-gray-300'} fixed top-0 w-full z-50 border-b transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src="/logo2.png" alt="Vishwa Logo" className="h-15" />
            </div>
  
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'products', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  title={page}
                  onClick={() => setCurrentPage(page)}
                  className={`capitalize text-sm font-medium transition-colors ${currentPage === page ? 'text-cyan-400' : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                >
                  {page}
                </button>
              ))}
            </div>
  
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className={`hidden lg:flex items-center rounded-full px-4 py-2 border transition ${isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-gray-100 border-gray-300 hover:border-gray-400'}`}>
                <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`} />
                <input type="text" placeholder="Search..." className={`bg-transparent outline-none ml-2 text-sm w-32 ${isDarkMode ? 'placeholder-gray-600' : 'placeholder-gray-500'}`} />
              </div>
  
              {/* Icons */}
              <button aria-label="Wishlist" title="Wishlist" className={`relative p-2 rounded-full transition ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`} onClick={() => setCurrentPage('wishlist')}>
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && <span className="absolute top-0 right-0 bg-cyan-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">{wishlist.length}</span>}
              </button>
              <button aria-label="Open cart" title="Cart" className={`relative p-2 rounded-full transition ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`} onClick={() => setCurrentPage('cart')}>
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && <span className="absolute top-0 right-0 bg-cyan-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">{cart.length}</span>}
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

  // Modern Hero
  const HomePage = () => (
    <div className="pt-20">
      {/* Hero Section */}
      <div className={`relative overflow-hidden min-h-screen flex items-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Premium Tech <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Essentials</span>
              </h1>
              <p className={`text-lg mb-8 max-w-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover a curated collection of high-quality gadgets and accessories designed to elevate your digital lifestyle.</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all group"
              >
                Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>
            <div className="text-9xl opacity-20 text-center">🛍️</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-300'} border-t py-20`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Quick delivery within 24 hours' },
              { icon: '🔒', title: 'Secure & Safe', desc: 'End-to-end encrypted transactions' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing and regular deals' },
            ].map((feature, i) => (
              <div key={i} className={`group border p-8 rounded-xl hover:border-cyan-500/50 transition-all ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'}`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className={`font-bold mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} py-20`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Featured Collection</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Product Card
    const ProductCard = ({ product }: { product: Product }) => (
      <div className={`group border rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'}`}>
        <div className={`relative h-48 flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-200 to-gray-100'}`}>
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</div>
          <button
            aria-label={`Toggle wishlist for ${product.name}`}
            title={`Toggle wishlist for ${product.name}`}
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
              wishlist.includes(product.id) ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : isDarkMode ? 'bg-black/40 border-gray-700 text-gray-400 hover:border-gray-500' : 'bg-white/40 border-gray-400 text-gray-600 hover:border-gray-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-5">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">{product.category}</span>
          <h3 className={`font-bold mt-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{product.name}</h3>
          <div className="flex items-center gap-1 mt-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-cyan-400 text-cyan-400' : isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
              ))}
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>({product.reviews})</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-black text-cyan-400">₹{product.price}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );

  // Products Page
  const ProductsPage = () => (
    <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen pt-20 pb-20`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className={`text-5xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>All Products</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  // Wishlist Page
  const WishlistPage = () => {
    const wishedProducts = products.filter(product => wishlist.includes(product.id));
    return (
      <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen pt-20 pb-20`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h1 className={`text-5xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>My Wishlist</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
          </div>
          {wishedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className={`w-24 h-24 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
              <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your wishlist is empty</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold px-8 py-3 rounded-full"
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

  // Cart Page
  const CartPage = () => (
    <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen pt-20 pb-20`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl font-black mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className={`w-24 h-24 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your cart is empty</p>
            <button
              onClick={() => setCurrentPage('products')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold px-8 py-3 rounded-full"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <div key={i} className={`bg-gradient-to-r ${isDarkMode ? 'from-gray-900 to-black border-gray-800' : 'from-gray-100 to-white border-gray-300'} border p-6 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-all`}>
                  <div className="flex items-center gap-6">
                    <div className={`text-5xl p-4 rounded-lg ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-200 to-gray-100'}`}>{item.image}</div>
                    <div>
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.name}</h3>
                      <p className="text-cyan-400 font-bold">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    title="Remove item"
                    onClick={() => removeFromCart(i)}
                    className={`p-2 hover:bg-red-500/20 rounded-lg transition-all ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-400'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className={`bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-black border-gray-800' : 'from-gray-100 to-white border-gray-300'} border rounded-xl p-8 h-fit sticky top-24`}>
              <h2 className={`text-2xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Order Summary</h2>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-800">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal:</span>
                  <span>₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping:</span>
                  <span className="text-cyan-400 font-bold">FREE</span>
                </div>
              </div>
              <div className={`flex justify-between font-black text-lg mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <span>Total:</span>
                <span className="text-cyan-400">₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all mb-3">
                Checkout
              </button>
              <button
                onClick={() => setCurrentPage('products')}
                className={`w-full border py-3 rounded-lg hover:border-cyan-500/50 transition-all font-bold ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-400 text-black'}`}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen pt-20 pb-20`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>About Vishwa</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mb-12"></div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-8xl opacity-30 mb-6">🌍</div>
            <h2 className={`text-4xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Our Story</h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vishwa was founded with a mission to bring premium tech accessories to customers worldwide. We believe in quality, innovation, and exceptional customer experiences.</p>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Our name "Vishwa" means "world" in Sanskrit, reflecting our global vision and commitment to serving customers across the globe with authentic, premium products.</p>
          </div>
          <div className="space-y-5">
            <div className={`bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 p-8 rounded-xl backdrop-blur-sm ${isDarkMode ? '' : 'bg-white border-gray-300'}`}>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Mission</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>To provide premium tech accessories that enhance daily life at affordable prices.</p>
            </div>
            <div className={`bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 p-8 rounded-xl backdrop-blur-sm ${isDarkMode ? '' : 'bg-white border-gray-300'}`}>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Vision</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>To become the most trusted e-commerce platform for quality gadgets globally.</p>
            </div>
            <div className={`bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 p-8 rounded-xl backdrop-blur-sm ${isDarkMode ? '' : 'bg-white border-gray-300'}`}>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Values</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quality, integrity, customer-first approach, and continuous innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen pt-20 pb-20`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Get in Touch</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mb-12"></div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[
              { icon: '📱', title: 'Phone', content: ['+91 1234 567 890'] },
              { icon: '✉️', title: 'Email', content: ['support@vishwa.com'] },
              { icon: '📍', title: 'Address', content: ['123 Tech Street, Innovation Hub', 'Mumbai, Maharashtra 400001'] },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1">{item.icon}</div>
                  <div>
                    <h3 className={`font-bold mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
                    {item.content.map((line, j) => (
                      <p key={j} className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-black border-gray-800' : 'from-gray-100 to-white border-gray-300'} border rounded-xl p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Send us a Message</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-gray-100 border-gray-300 text-black placeholder-gray-500'} border rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition`} />
              <input type="email" placeholder="Your Email" className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-gray-100 border-gray-300 text-black placeholder-gray-500'} border rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition`} />
              <textarea placeholder="Your Message" rows={4} className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-600' : 'bg-gray-100 border-gray-300 text-black placeholder-gray-500'} border rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition resize-none`}></textarea>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-300'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-16 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h4 className={`font-black mb-4 text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>VISHWA</h4>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Premium tech accessories that enhance your digital lifestyle with quality and innovation.</p>
            <div className="flex gap-3">
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
                  className={`w-10 h-10 ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white hover:bg-cyan-500/10' : 'bg-gray-100 border-gray-300 text-black hover:bg-cyan-500/10'} border rounded-full hover:border-cyan-500/50 transition flex items-center justify-center`}
                >
                  <FontAwesomeIcon icon={s.icon} />
                  <span className="sr-only">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex-1">
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Products', 'About', 'Contact'].map((link) => (
                <li key={link}><button title={link} onClick={() => setCurrentPage(link.toLowerCase())} className={`text-sm hover:text-cyan-400 transition flex items-center gap-2 group ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}><span className="opacity-0 group-hover:opacity-100 transition">→</span> {link}</button></li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="flex-1">
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Support</h4>
            <ul className="space-y-3">
              {['Track Order', 'Returns', 'FAQ', 'Help Center'].map((link) => (
                <li key={link}><button title={link} className={`text-sm hover:text-cyan-400 transition flex items-center gap-2 group ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}><span className="opacity-0 group-hover:opacity-100 transition">→</span> {link}</button></li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex-1">
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Contact</h4>
            <div className="space-y-4">
              <div>
                <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Email</p>
                <a href="mailto:support@vishwa.com" className="text-cyan-400 text-sm hover:text-cyan-300 transition block">support@vishwa.com</a>
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Phone</p>
                <a href="tel:+911234567890" className="text-cyan-400 text-sm hover:text-cyan-300 transition block">+91 1234 567 890</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t py-6 px-4 md:px-6 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>&copy; 2025 Vishwa. All rights reserved.</p>
          <div className="flex gap-6">
            <button title="Privacy Policy" className={`text-xs hover:text-cyan-400 transition ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Privacy Policy</button>
            <button title="Terms & Conditions" className={`text-xs hover:text-cyan-400 transition ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Terms & Conditions</button>
            <button title="Sitemap" className={`text-xs hover:text-cyan-400 transition ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Sitemap</button>
          </div>
        </div>
      </div>
    </div>
  );

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
      </main>
      <Footer />
    </div>
  );
}
