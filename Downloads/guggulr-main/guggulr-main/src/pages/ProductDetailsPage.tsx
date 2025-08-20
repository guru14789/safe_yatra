import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import QuoteModal from '@/components/QuoteModal';



const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState('500g');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const product = {
    id: parseInt(id),
    name: 'Premium Almonds',
    description: 'Our Premium Almonds are sourced directly from the finest orchards in California. These almonds are known for their rich, buttery flavor and exceptional nutritional value. Packed with protein, healthy fats, vitamin E, and magnesium, they make the perfect healthy snack for any time of day.',
    origin: 'California, USA',
    benefits: ['High in Protein', 'Rich in Vitamin E', 'Heart Healthy', 'Gluten Free'],
    usage: 'Perfect for snacking, baking, or adding to your morning cereal and smoothies.',
    image: 'Premium California almonds with rich flavor and perfect texture',
    rating: 4.8,
    reviews: 124,
    quantities: [
      { size: '250g' },
      { size: '500g' },
      { size: '1kg' },
    ]
  };

  const similarProducts = [
    { id: 2, name: 'Cashew Delight', image: 'Creamy cashews from Kerala farms' },
    { id: 4, name: 'Walnut Wonder', image: 'Fresh walnuts with omega-3 richness' },
    { id: 3, name: 'Pistachio Paradise', image: 'Turkish pistachios with natural taste' },
  ];

  const handleAskQuote = () => {
    setIsModalOpen(true);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
    });
  };

  const handleShare = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const textRevealVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Premium Quality | Guggulr Global Foods</title>
        <meta name="description" content={`${product.name} - ${product.description.substring(0, 150)}...`} />
        <meta property="og:title" content={`${product.name} - Premium Quality | Guggulr Global Foods`} />
        <meta property="og:description" content={`${product.name} - ${product.description.substring(0, 150)}...`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/products" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="glass-effect rounded-2xl overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                  <img  alt={product.name} className="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <motion.div 
                    key={index} 
                    className="glass-effect rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img  alt={`${product.name} view ${index}`} className="w-full h-20 object-cover" src="https://images.unsplash.com/photo-1516116216624-53e697fedbea" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              <motion.h1 variants={textRevealVariant} custom={0} className="font-display text-4xl font-bold text-gray-800">{product.name}</motion.h1>
              
              <motion.div variants={textRevealVariant} custom={1} className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={handleWishlist} className={`p-2 rounded-full transition-colors ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'}`}>
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button onClick={handleShare} className="p-2 rounded-full text-gray-400 hover:text-orange-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
              
              <motion.p variants={textRevealVariant} custom={2} className="text-gray-600 leading-relaxed">{product.description}</motion.p>
              
              <motion.div variants={textRevealVariant} custom={3}>
                <span className="font-semibold text-gray-800 block mb-3">Select Quantity:</span>
                <div className="relative">
                  <select
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg appearance-none bg-transparent focus:border-orange-500 focus:outline-none transition-all"
                  >
                    {product.quantities.map((qty) => (
                      <option key={qty.size} value={qty.size}>
                        {qty.size}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              <motion.div variants={textRevealVariant} custom={4} className="space-y-4">
                <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3" onClick={handleAskQuote}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ask for Quote
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <section className="mt-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-3xl font-bold text-gray-800 mb-8 text-center">Similar Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarProducts.map((similarProduct, index) => (
                  <motion.div
                    key={similarProduct.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.03, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                    className="glass-effect rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <img  alt={similarProduct.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-gray-800 mb-2">{similarProduct.name}</h3>
                      <div className="flex justify-between items-center">
                        <Link to={`/product/${similarProduct.id}`}>
                          <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </>
  );
};

export default ProductDetailsPage;