import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Gift, Leaf, Truck, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

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

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);

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
            className={`w-3 h-3  transition-all duration-300 ${
              index === currentIndex ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
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
    { name: "Sarah Johnson", rating: 5, text: "The quality is exceptional! Best nuts I've ever tasted.", role: "Food Blogger" },
    { name: "Michael Chen", rating: 5, text: "Perfect for corporate gifting. Our clients loved the hampers!", role: "CEO, TechCorp" },
    { name: "Emily Davis", rating: 5, text: "Fresh spices that transformed my cooking completely.", role: "Chef" },
    { name: "Rahul Sharma", rating: 5, text: "Outstanding quality and fast delivery. Highly recommended!", role: "Home Cook" },
    { name: "Priya Patel", rating: 5, text: "The gift hampers are beautifully packaged and delicious.", role: "Event Planner" }
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

  type Testimonial = {
    name: string;
    rating: number;
    text: string;
    role: string;
  };

  const TestimonialCard = ({ item, isActive }: { item: Testimonial; isActive: boolean }) => (
    <div className={`bg-white shadow-lg rounded-3xl p-8 text-center transition-all duration-300 ${isActive ? 'shadow-2xl' : ''}`}>
      <div className="flex justify-center mb-5">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic text-lg">"{item.text}"</p>
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg mb-3">
          {item.name[0]}
        </div>
        <p className="font-semibold text-gray-900">{item.name}</p>
        <span className="text-sm text-gray-500">{item.role}</span>
      </div>
    </div>
  );

  const ContinuousTestimonials = () => {
    const [isPaused, setIsPaused] = useState(false);
    
    return (
      <div 
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex space-x-8"
          animate={{ x: isPaused ? 0 : [-100, -100 * testimonials.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
          style={{ width: `${(testimonials.length + 3) * 400}px` }}
        >
          {[...testimonials, ...testimonials.slice(0, 3)].map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-96">
              <TestimonialCard item={testimonial} isActive={true} />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-6">
              Guggulr
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Global Foods
              </span>
            </h1>
            
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full inline-block mb-10 shadow-lg">
              <p className="font-semibold text-xl tracking-wide">
                Nuts for your desk! Gifts for their heart!
              </p>
            </div>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover premium nuts, exotic spices, and elegant gift hampers. 
              Experience the finest quality from around the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="explore" size="lg" onClick={handleExplore}>
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleExplore}>
                Request Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              Explore Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Collections</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Toggle between premium nuts and exotic spices to discover nature's finest treasures
            </p>
          </div>

          {/* Category Toggle */}
          <div className="flex justify-center mb-14">
            <div className="relative flex bg-white rounded-full shadow-lg p-1">
              {['nuts', 'spices'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-10 py-3 rounded-full font-semibold transition-colors z-10 ${
                    activeCategory === cat ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
              <motion.div
                className="absolute top-1 bottom-1 left-1 w-1/2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md"
                animate={{ x: activeCategory === 'nuts' ? '0%' : '100%' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </div>

          <AutoSlideshow
            items={featuredProducts[activeCategory]}
            renderItem={(item, isActive) => <ProductCard item={item} isActive={isActive} />}
          />
        </div>
      </section>

      {/* Why Choose Guggulr */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500">
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

          <div className="relative overflow-hidden max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatureIndex}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-2xl p-8 mx-auto transition-all duration-500"
              >
                {(() => {
                  const currentFeature = features[currentFeatureIndex];
                  const IconComponent = currentFeature.icon;
                  return (
                    <div className="flex items-start space-x-6">
                      {/* Left side - Icon and visual element */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                          <IconComponent className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      
                      {/* Right side - Content */}
                      <div className="flex-1 pt-2 relative">
                        <div className="text-sm text-gray-500 mb-2 font-medium">
                          {new Date().toLocaleDateString('en-GB', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {currentFeature.title}
                        </h3>
                        
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {currentFeature.desc}
                        </p>
                        
                        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                          LEARN MORE
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
            
            {/* Progress indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeatureIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeatureIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
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