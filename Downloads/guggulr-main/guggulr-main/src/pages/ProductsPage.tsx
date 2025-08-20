import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, QrCode } from 'lucide-react';
import { Package } from 'lucide-react';
type Category = 'nuts' | 'spices';
import almonds from '../assets/Almonds.png';
import cashew from '../assets/4-piece Cashews.png'
import dates from '../assets/Black Dates.png'
import mixed from '../assets/Mixed Dry fruits.png'
import walnut from '../assets/Walnut (kernels).png'
import pisco from '../assets/Pistachios.png'
import whitedates from '../assets/White Dates.png'
import greenrasin from '../assets/Green Raisins (Type 1).png'
import pepper from '../assets/Pepper.png'
import turmeric from '../assets/Turmeric Stick.png'
import cardamom from '../assets/Wild Cardamom.png';
import cinnamim from '../assets/Singapore Cinnamon.png'
import saffron from '../assets/Saffron.png'

type Product = {
  id: number;
  name: string;
  tagline: string;
  image: string;
};

const products: Record<Category, Product[]> = {
  nuts: [
    { id: 1, name: 'Premium Almonds', tagline: 'California\'s finest', image:almonds },
    { id: 2, name: 'Cashew Delight', tagline: 'Creamy & nutritious', image: cashew },
    { id: 3, name: 'Pistachio Paradise', tagline: 'Turkish excellence', image: pisco },
    { id: 4, name: 'Walnut Wonder', tagline: 'Brain food supreme', image: walnut },
    { id: 5, name: 'Date Delights', tagline: 'Nature\'s candy', image: dates },
    { id: 6, name: 'Mixed Nuts Premium', tagline: 'Perfect combination', image: mixed },
    { id: 7, name: 'White Dates Delights', tagline: 'Rich & crunchy', image: whitedates },
    { id : 8, name: 'Green rasins', tagline: 'Sweet & tangy', image: greenrasin },
  ],
  spices: [
    { id: 9, name: 'Saffron Gold', tagline: 'Kashmir\'s treasure', image: saffron },
    { id: 10, name: 'Cardamom Elite', tagline: 'Queen of spices', image: cardamom},
    { id: 11, name: 'Cinnamon Bark', tagline: 'Sweet & aromatic', image: cinnamim },
    { id: 12, name: 'Black Pepper Premium', tagline: 'King of spices', image: pepper },

    { id: 13, name: 'Turmeric Gold', tagline: 'Golden healing', image: turmeric },
  ]
};

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<Category>('nuts');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedProductForQR, setSelectedProductForQR] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleQRView = (product: Product) => {
    setSelectedProductForQR(product);
    setIsQRModalOpen(true);
  };

  const handleLoadMore = () => {
    alert('🚧 Load More Coming Soon! This feature isn\'t ready yet, but you can request it in your next prompt. 🚀');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Hero / Banner */}
        <section className="relative bg-gradient-to-br from-orange-500 to-red-600 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-40 h-40 sm:w-72 sm:h-72 bg-orange-400 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-96 sm:h-96 bg-red-400 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 drop-shadow-lg"
            >
              <div className="flex items-center justify-center space-x-4 mb-4 sm:mb-6 drop-shadow-lg">
  <Package className="w-12 h-12 sm:w-16 sm:h-16" />
  <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
    Products
  </h1>
</div>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4"
            >
              Discover a curated collection of premium nuts, dry fruits, and exotic spices,
              sourced globally for quality, luxury, and taste.
            </motion.p>
          </div>
        </section>

        {/* Category Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/70 backdrop-blur-md rounded-full p-1 shadow-lg">
              <button
                onClick={() => setActiveCategory('nuts')}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                  activeCategory === 'nuts'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Nuts
              </button>
              <button
                onClick={() => setActiveCategory('spices')}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                  activeCategory === 'spices'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Spices
              </button>
            </div>
          </div>
        </div>

        {/* Controls + Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 lg:mb-10 space-y-4 sm:space-y-0 gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 shadow-sm bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <button className="p-2 sm:p-3 rounded-xl border border-orange-300 text-orange-600 hover:bg-orange-50 transition bg-white/70 backdrop-blur-md">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="flex border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white/70 backdrop-blur-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 sm:p-3 transition ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 sm:p-3 transition ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {products[activeCategory].map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.2)',
                  }}
                  className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row items-center' : ''
                  }`}
                >
                  {/* Image */}
                 <div
  className={`${
    viewMode === 'list'
      ? 'w-full sm:w-40 md:w-48 lg:w-56 h-40 sm:h-40 md:h-48 lg:h-48 flex-shrink-0'
      : 'h-40 sm:h-48 md:h-56 lg:h-64'
  } overflow-hidden`}
>
  <img
    src={product.image}
    alt={product.name}
    className={`w-full ${viewMode === 'list' ? 'sm:w-40 sm:h-40' : 'h-48'} object-contain rounded-t-2xl sm:rounded-l-3xl`}
    loading="lazy"
  />
</div>


                  {/* Content */}
                  <div className={`p-4 sm:p-5 md:p-6 ${viewMode === 'list' ? 'flex-1 w-full' : ''}`}>
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg sm:text-xl md:text-xl text-gray-800 group-hover:text-orange-600 transition mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">{product.tagline}</p>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                      <button
                        className="flex-1 px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md text-sm sm:text-base font-medium transition"
                        onClick={() => handleQuickView(product)}
                      >
                        Ask for Quote
                      </button>
                      <div className="flex gap-2">
                        <button
                          className="flex-1 px-3 py-2 sm:py-3 rounded-xl border border-orange-300 text-orange-600 hover:bg-orange-50 text-sm sm:text-base font-medium transition"
                        >
                          View Details
                        </button>
                        <button
                          className="p-2 sm:p-3 rounded-xl border border-orange-300 text-orange-600 hover:bg-orange-50 transition flex-shrink-0"
                          onClick={() => handleQRView(product)}
                          title="View QR Code"
                        >
                          <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More */}
          <div className="text-center mt-10 sm:mt-12 md:mt-14">
            <button
              className="px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg text-sm sm:text-base md:text-lg font-medium transition"
              onClick={handleLoadMore}
            >
              Load More Products
            </button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md sm:max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1635865165118-917ed9e20936"
                alt={selectedProduct.name}
                className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {selectedProduct.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-sm sm:text-base">
                  Request Quote
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQRModalOpen && selectedProductForQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full"
          >
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                QR Code
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {selectedProductForQR.name}
              </p>
              {/* QR Code Image */}
              <div className="bg-gray-100 rounded-xl p-4 mb-6 flex items-center justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/product/"
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
               
                <button 
                  onClick={() => setIsQRModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;