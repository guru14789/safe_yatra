import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Gift, Info, Phone, ShoppingBag, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategory } from '@/context/CategoryContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const location = useLocation();
  const { activeCategory, setActiveCategory } = useCategory();
  const { toast } = useToast();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Products', path: '/products', icon: <Package className="h-5 w-5" /> },
    { name: 'Gifting', path: '/gifting', icon: <Gift className="h-5 w-5" /> },
    { name: 'About', path: '/about', icon: <Info className="h-5 w-5" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="h-5 w-5" /> },
  ];

  const isActive = (path) => location.pathname === path;
  const showCategoryToggle = location.pathname === '/products';

  const handleGetQuote = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      {/* Top Navbar (Desktop) */}
      <nav className="hidden md:block sticky top-0 z-50 glass-effect border-b border-orange-200/20 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative w-24 h-10">
                <img
                  alt="Guggulr Logo"
                  src="/logo.png"
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-orange-600'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Category Toggle (Desktop) */}
            {showCategoryToggle && (
              <div className="flex items-center glass-effect rounded-full p-1 mx-4">
                {['spices', 'nuts'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'text-white'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    {activeCategory === category && (
                      <motion.div
                        layoutId="category-highlight"
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{category}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Get Quote Button */}
            <div className="flex items-center">
              <Button
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Category Toggle (Only on /products) */}
      {showCategoryToggle && (
        <div className="md:hidden flex justify-center gap-4 py-2 bg-white border-b border-orange-200/20">
          {['spices', 'nuts'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="category-highlight"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 capitalize">{category}</span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom Navbar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass-effect backdrop-blur-lg bg-white/60 border-t border-orange-200/20 flex justify-around items-center py-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              aria-label={item.name}
              className={`flex flex-col items-center text-xs ${
                isActive(item.path) ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
          <Button
            size="icon"
            className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
            onClick={handleGetQuote}
            aria-label="Get Quote"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
