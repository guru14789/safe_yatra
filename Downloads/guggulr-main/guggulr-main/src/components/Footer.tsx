import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

// Memoized social icon component for better performance
const SocialIcon = memo(({ Icon, label }) => (
  <div className="group relative">
    <Icon className="w-6 h-6 text-gray-400 hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110 group-hover:drop-shadow-lg" />
    {/* Hover tooltip */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
      {label}
    </div>
  </div>
));

// Memoized contact item component
const ContactItem = memo(({ Icon, children }) => (
  <div className="flex items-center space-x-3 group hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors duration-200">
    <Icon className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-200" />
    <span className="text-sm group-hover:text-gray-300 transition-colors duration-200">
      {children}
    </span>
  </div>
));

// Memoized category item component
const CategoryItem = memo(({ children }) => (
  <div className="block text-gray-400 hover:text-orange-400 transition-all duration-300 cursor-pointer hover:translate-x-2 hover:drop-shadow-sm relative group">
    {children}
    <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </div>
));

const Footer = () => {
  // Memoized data to prevent re-creation on each render
  const quickLinks = React.useMemo(() => [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Gifting", to: "/gifting" },
    { label: "About Us", to: "/about" },
  ], []);

  const socialIcons = React.useMemo(() => [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Twitter, label: "Twitter" },
  ], []);

  const categories = React.useMemo(() => [
    "Premium Nuts",
    "Dry Fruits", 
    "Exotic Spices",
    "Gift Hampers"
  ], []);

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Enhanced decorative gradient blobs with animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse [animation-delay:0s]" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Enhanced Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src="logo.jpg" 
                  alt="Guggulr Logo" 
                  width="100" 
                  height="48" 
                  className="rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Subtle glow effect on logo */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Premium nuts, dry fruits, and exotic spices sourced globally for your 
              <span className="text-orange-400 font-medium"> health and happiness</span>.
            </p>
            
            {/* Enhanced social icons */}
            <div className="flex space-x-6">
              {socialIcons.map(({ Icon, label }, idx) => (
                <SocialIcon key={idx} Icon={Icon} label={label} />
              ))}
            </div>

            {/* Newsletter signup hint */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
              <p className="text-xs text-orange-200 mb-2">Stay updated with our latest offers!</p>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-gray-400">Subscribe to our newsletter</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl mb-6 text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  className="block text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-2 relative group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {/* Subtle background highlight on hover */}
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Enhanced Categories */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl mb-6 text-white relative">
              Categories
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            </h3>
            <div className="space-y-3">
              {categories.map((category, idx) => (
                <CategoryItem key={idx}>{category}</CategoryItem>
              ))}
            </div>
          </div>

          {/* Enhanced Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl mb-6 text-white relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            </h3>
            <div className="space-y-4">
              <ContactItem Icon={Phone}>
                +1 (555) 123-4567
              </ContactItem>
              
              <ContactItem Icon={Mail}>
                hello@guggulr.com
              </ContactItem>
              
              <div className="flex items-start space-x-3 group hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors duration-200">
                <MapPin className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-200 mt-1 flex-shrink-0" />
                <span className="text-sm group-hover:text-gray-300 transition-colors duration-200 max-w-xs">
                  123 Spice Street, Global Foods District
                </span>
              </div>
            </div>

            {/* Business hours */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
              <p className="text-xs text-gray-300 mb-1 font-medium">Business Hours</p>
              <p className="text-xs text-gray-400">Mon - Fri: 9AM - 6PM EST</p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom bar */}
        <div className="border-t border-gray-700/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm tracking-wide">
              © 2024 Guggulr Global Foods. All rights reserved.
            </p>
            
            {/* Additional links */}
            <div className="flex space-x-6 text-xs text-gray-500">
              <span className="hover:text-orange-400 cursor-pointer transition-colors duration-200">
                Privacy Policy
              </span>
              <span className="hover:text-orange-400 cursor-pointer transition-colors duration-200">
                Terms of Service
              </span>
              <span className="hover:text-orange-400 cursor-pointer transition-colors duration-200">
                Cookie Policy
              </span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center mt-6 space-x-8 opacity-60">
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Secure Payments</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:1s]" />
              <span>Fast Shipping</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:2s]" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add display name for debugging
Footer.displayName = 'Footer';

export default memo(Footer);