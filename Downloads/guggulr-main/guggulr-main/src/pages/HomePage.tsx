
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Gift, Leaf, Truck, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from './stack';

// Button Component
const Button = ({ children, className = "", variant = "default", size = "md", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500",
    explore: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl"
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const AutoSlideshow = ({ items, renderItem, autoSlideInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, autoSlideInterval);
      return () => clearInterval(interval);
    }
  }, [items.length, autoSlideInterval, isHovered]);

  const getVisibleItems = () => {
    const totalItems = items.length;
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    const nextIndex = (currentIndex + 1) % totalItems;
    
    return [
      { item: items[prevIndex], position: 'prev' },
      { item: items[currentIndex], position: 'current' },
      { item: items[nextIndex], position: 'next' }
    ];
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="flex items-center justify-center space-x-8 w-full max-w-6xl">
          {getVisibleItems().map(({ item, position }, index) => (
            <motion.div
              key={`${currentIndex}-${position}`}
              className={`
                ${position === 'current' ? 'scale-100 opacity-100 z-10' : 'scale-75 opacity-40 z-0'}
                ${position === 'prev' ? 'transform -translate-x-4' : ''}
                ${position === 'next' ? 'transform translate-x-4' : ''}
                transition-all duration-500 ease-in-out flex-shrink-0
              `}
              style={{ width: position === 'current' ? '400px' : '300px' }}
            >
              {renderItem(item, position === 'current')}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CountUpAnimation = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const startTime = Date.now();
    const endTime = startTime + (duration * 1000);
    
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
        setHasAnimated(true);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [end, duration, hasAnimated]);

  return <span>{count}{suffix}</span>;
};

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('nuts');
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/products');
  };

  const featuredProducts = {
    nuts: [
      { id: 1, name: "Premium Almonds", desc: "Premium California almonds with rich flavor" },
      { id: 2, name: "Cashew Delight", desc: "Creamy cashews from Kerala farms" },
      { id: 3, name: "Pistachio Paradise", desc: "Turkish pistachios with natural taste" },
      { id: 4, name: "Walnut Wonder", desc: "Fresh walnuts packed with omega-3"},
      { id: 5, name: "Mixed Nuts Premium", desc: "Assorted premium nuts collection" }
    ],
    spices: [
      { id: 6, name: "Saffron Gold", desc: "Premium Kashmir saffron threads" },
      { id: 7, name: "Cardamom Elite", desc: "Green cardamom pods from Western Ghats" },
      { id: 8, name: "Cinnamon Bark", desc: "Ceylon cinnamon sticks with sweet aroma" },
      { id: 9, name: "Black Pepper", desc: "Whole black peppercorns from Malabar" },
      { id: 10, name: "Turmeric Gold", desc: "Organic turmeric powder from Tamil Nadu" }
    ]
  };

  const testimonials = [
    { name: "Sarah Mitchell", rating: 5, text: "Guggulr transformed our corporate gifting strategy. The quality is exceptional...", role: "Tech Innovations Inc." },
    { name: "David Chen", rating: 5, text: "I've used Guggulr for dozens of weddings, and the response is always...", role: "Elegant Events Co." },
    { name: "Emily Rodriguez", rating: 5, text: "Every holiday season, Guggulr nuts are the star of our family gatherings....", role: "Happy Home" },
    { name: "Michael Thompson", rating: 5, text: "As someone who values nutrition, I appreciate Guggulr's commitment to...", role: "Vitality Plus" },
    { name: "Priya Patel", rating: 5, text: "The gift hampers are beautifully packaged and delicious.", role: "Event Planner" },
    { name: "James Wilson", rating: 5, text: "Outstanding customer service and premium quality products every time.", role: "Corporate Solutions" }
  ];

  const features = [
    { icon: Leaf, title: "100% Natural", desc: "Pure, preservative-free ingredients for a healthier you." },
    { icon: CheckCircle, title: "Premium Quality", desc: "Handpicked from the world's finest farms." },
    { icon: Gift, title: "Perfect Gifting", desc: "Luxurious hampers designed to impress on every occasion." },
    { icon: Truck, title: "Fast Delivery", desc: "Freshness guaranteed with quick, reliable shipping." },
    { icon: Star, title: "5-Star Rated", desc: "Trusted by thousands of satisfied customers worldwide." }
  ];

  // Auto-advance features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ProductCard = ({ item, isActive }) => (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 ${isActive ? 'border-orange-200' : ''}`}>
      <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-5 flex items-center justify-center">
        <div className="text-6xl opacity-60">🥜</div>
      </div>
      <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        New
      </span>
      <h3 className="font-extrabold text-xl text-gray-900 mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-4">{item.desc}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-extrabold text-orange-600">{item.price}</span>
        <Button size="sm" className="rounded-full">View</Button>
      </div>
    </div>
  );

  const TestimonialCard = ({ item, isActive }) => (
    <div className="relative group w-80 flex-shrink-0">
      {/* Gradient Border Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-red-300 to-orange-300 rounded-2xl p-0.5">
        <div className="bg-white rounded-2xl h-full w-full"></div>
      </div>
      
      {/* Card Content */}
      <div className="relative bg-white rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Quote Icon */}
        <div className="absolute top-4 left-4 text-5xl text-orange-300 font-serif leading-none select-none">
          "
        </div>
        
        {/* Content */}
        <div className="pt-8">
          <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">
            {item.text}
          </p>
          
          {/* Rating Stars */}
          <div className="flex justify-start mb-4">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
            ))}
          </div>
          
          {/* Author Info */}
          <div>
            <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">{item.role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContinuousTestimonials = () => {
    const [isPaused, setIsPaused] = useState(false);
    
    // Create enough duplicates for seamless infinite scroll
    const duplicatedTestimonials = [
      ...testimonials, 
      ...testimonials
    ];
    
    return (
      <div 
        className="overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex space-x-6"
          style={{
            width: `${duplicatedTestimonials.length * 326}px`
          }}
          animate={isPaused ? undefined : { 
            x: [0, -(testimonials.length * 326)]
          }}
          transition={isPaused ? { duration: 0 } : {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // Much slower - 40 seconds total
              ease: "linear"
            }
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`testimonial-${index}`} item={testimonial} isActive={true} />
          ))}
        </motion.div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl">🥜</div>
        <div className="absolute top-40 right-20 text-4xl">🌿</div>
        <div className="absolute bottom-32 left-20 text-5xl">🎁</div>
        <div className="absolute top-60 left-1/3 text-3xl">🥥</div>
        <div className="absolute bottom-40 right-1/4 text-4xl">🌶️</div>
      </div>

      <div className="container mx-auto px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              <span className="text-gray-800">Guggulr</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Global Foods
              </span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-2xl font-semibold text-gray-800">
                Nuts for your desk! Gifts for their heart!
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Experience premium quality nuts, exotic spices, and elegantly crafted gift hampers. 
                From corporate gifting to personal treats, we deliver excellence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="explore" size="lg" onClick={handleExplore} className="text-lg px-8 py-4">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleExplore} className="text-lg px-8 py-4">
                Corporate Gifting
              </Button>
            </div>
          </motion.div>

          {/* Right Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              
              {/* Gift Box - Top Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-orange-200">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <Gift className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Premium Gifting</h3>
                    <p className="text-sm text-gray-600">Luxury hampers for special occasions</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Your Gifting Journey Starts Here
                </div>
              </motion.div>

              {/* Nuts Bowl - Top Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative group cursor-pointer mt-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-orange-200">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <div className="text-3xl">🥜</div>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Premium Nuts</h3>
                    <p className="text-sm text-gray-600">Handpicked from world's finest farms</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Your Quality Day Begins Here
                </div>
              </motion.div>

              {/* Spices Collection - Bottom Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="col-span-2 relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border-4 border-orange-200">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg mb-2">
                        <div className="text-2xl">🌶️</div>
                      </div>
                      <p className="text-xs text-gray-600">Exotic Spices</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mb-2">
                        <div className="text-2xl">🌿</div>
                      </div>
                      <p className="text-xs text-gray-600">Fresh Herbs</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg mb-2">
                        <div className="text-2xl">✨</div>
                      </div>
                      <p className="text-xs text-gray-600">Premium Quality</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-6 -right-6"
            >
              <button
                onClick={handleExplore}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
              >
                <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Trust Indicators Section */}
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Happy Customers */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <motion.div 
                className="text-5xl font-extrabold text-orange-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <CountUpAnimation end={5000} suffix="+" duration={2} />
              </motion.div>
              <div className="text-lg font-semibold text-gray-800 mb-1">Happy Customers</div>
              <div className="text-sm text-gray-500">Satisfied clients worldwide</div>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Natural Products */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <motion.div 
                className="text-5xl font-extrabold text-orange-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CountUpAnimation end={100} suffix="%" duration={2} />
              </motion.div>
              <div className="text-lg font-semibold text-gray-800 mb-1">Natural Products</div>
              <div className="text-sm text-gray-500">Pure & preservative-free</div>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Fresh Delivery */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <motion.div 
                className="text-5xl font-extrabold text-orange-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CountUpAnimation end={24} suffix="hr" duration={2} />
              </motion.div>
              <div className="text-lg font-semibold text-gray-800 mb-1">Fresh Delivery</div>
              <div className="text-sm text-gray-500">Lightning-fast shipping</div>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>

     {/* Categories Section - Vertical Marquee */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              Explore Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Collections</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium nuts and exotic spices in continuous display
            </p>
          </div>

          <div className="flex justify-center items-start space-x-8 overflow-hidden h-[600px]">
            {/* Column 1 - Nuts (Moving Up) */}
            <div className="w-80 relative overflow-hidden">
              <motion.div
                className="flex flex-col space-y-6"
                animate={{ y: [0, -100 * featuredProducts.nuts.length] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear"
                  }
                }}
              >
                {[...featuredProducts.nuts, ...featuredProducts.nuts].map((item, index) => (
                  <div key={`nuts-${index}`} className="flex-shrink-0">
                    <ProductCard item={item} isActive={true} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 2 - Spices (Moving Down) */}
            <div className="w-80 relative overflow-hidden">
              <motion.div
                className="flex flex-col space-y-6"
                animate={{ y: [-100 * featuredProducts.spices.length, 0] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear"
                  }
                }}
              >
                {[...featuredProducts.spices, ...featuredProducts.spices].map((item, index) => (
                  <div key={`spices-${index}`} className="flex-shrink-0">
                    <ProductCard item={item} isActive={true} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 3 - Mixed (Moving Up, Slower) */}
            <div className="w-80 relative overflow-hidden">
              <motion.div
                className="flex flex-col space-y-6"
                animate={{ y: [0, -100 * [...featuredProducts.nuts.slice(0, 3), ...featuredProducts.spices.slice(0, 2)].length] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear"
                  }
                }}
              >
                {[
                  ...featuredProducts.nuts.slice(0, 3), 
                  ...featuredProducts.spices.slice(0, 2),
                  ...featuredProducts.nuts.slice(0, 3), 
                  ...featuredProducts.spices.slice(0, 2)
                ].map((item, index) => (
                  <div key={`mixed-${index}`} className="flex-shrink-0">
                    <ProductCard item={item} isActive={true} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

     {/* Why Choose Guggulr - Scroll Stack */}
<section className="py-20 bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-white mb-6">
        Why Choose {" "}
        <span className="bg-gradient-to-r from-yellow-300 to-orange-100 bg-clip-text text-transparent">
          Guggulr?
        </span>
      </h2>
      <p className="text-lg text-orange-100 max-w-2xl mx-auto">
        We deliver more than just products – we deliver trust, quality, and a touch of elegance to every experience.
      </p>
    </div>

    <div className="h-[500px]">
      <ScrollStack className="scrollbar-hide">
        {/* Card 1 - 100% Natural */}
        <ScrollStackItem>
          <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-[1.02] h-full flex items-center">
            <div className="flex items-start space-x-4 w-full">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  100% Natural
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Pure, preservative-free ingredients for a healthier you. Our commitment to natural goodness means no artificial additives.
                </p>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* Card 2 - Premium Quality */}
        <ScrollStackItem>
          <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-[1.02] h-full flex items-center">
            <div className="flex items-start space-x-4 w-full">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Premium Quality
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Handpicked from the world's finest farms. Every product undergoes rigorous quality checks to ensure excellence.
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* Card 3 - Perfect Gifting */}
        <ScrollStackItem>
          <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-[1.02] h-full flex items-center">
            <div className="flex items-start space-x-4 w-full">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Perfect Gifting
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Luxurious hampers designed to impress on every occasion. Make every moment memorable with elegant packaging.
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* Card 4 - Fast Delivery */}
        <ScrollStackItem>
          <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-[1.02] h-full flex items-center">
            <div className="flex items-start space-x-4 w-full">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Freshness guaranteed with quick, reliable shipping. Our optimized logistics ensure perfect condition delivery.
                </p>
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* Card 5 - 5-Star Rated */}
        <ScrollStackItem>
          <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-[1.02] h-full flex items-center">
            <div className="flex items-start space-x-4 w-full">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  5-Star Rated
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Trusted by thousands of satisfied customers worldwide. Our consistent ratings reflect unwavering excellence.
                </p>
                <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  </div>
</section>

      {/* Customer Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Thousands of happy customers trust Guggulr for unmatched quality, luxury, and taste.
            </p>
          </div>

          <ContinuousTestimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="text-6xl font-extrabold text-white">
              Taste the Future of{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-100 bg-clip-text text-transparent">
                Premium Quality
              </span>
            </h2>

            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Discover world-class nuts, exotic spices, and elegant gift hampers. 
              Elevate your snacking and gifting game with Guggulr Global Foods.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50"
                onClick={handleExplore}
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50"
                onClick={handleExplore}
              >
                Request Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;