import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Gift, Info, Phone, ShoppingBag, Package, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategory } from '@/context/CategoryContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const location = useLocation();
  const { activeCategory, setActiveCategory } = useCategory();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Products', path: '/products', icon: <Package className="h-5 w-5" /> },
    { name: 'Gifting', path: '/gifting', icon: <Gift className="h-5 w-5" /> },
    { name: 'About', path: '/about', icon: <Info className="h-5 w-5" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="h-5 w-5" /> },
  ];

  const isActive = (path) => location.pathname === path;
  const showCategoryToggle = location.pathname === '/products';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleGetQuote = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm border-b border-orange-200/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative w-24 h-10 transition-transform duration-200 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <img
                  alt="Guggulr Logo"
                  src="/logo.png"
                  className="relative w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group relative"
                >
                  <div className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                  }`}>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center space-x-2">
                      <span className="hidden lg:inline">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>

                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Category Toggle & Get Quote */}
            <div className="hidden md:flex items-center space-x-4">
              
              

              {/* Get Quote Button */}
              <Button
                onClick={handleGetQuote}
                className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                <ShoppingBag className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Get Quote</span>
              </Button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="relative z-50 p-2 hover:bg-orange-50 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white/95 backdrop-blur-md shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        
                        <span className="relative z-10">{item.icon}</span>
                        <span className="relative z-10 font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Get Quote Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Button
                    onClick={handleGetQuote}
                    className="w-full group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                    <ShoppingBag className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10 font-semibold">Get Quote</span>
                  </Button>
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-auto pt-8 text-center"
                >
                  <p className="text-sm text-gray-500">
                    © 2024 Guggulr. All rights reserved.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;