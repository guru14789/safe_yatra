import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Building, Star, QrCode } from 'lucide-react';
import hamper1 from '../assets/Gifts_Website/1.png'
import hamper2 from '../assets/Gifts_Website/2.png'
import hamper3 from '../assets/Gifts_Website/3.png'
import hamper4 from '../assets/Gifts_Website/4.png'
import hamper5 from '../assets/Gifts_Website/5.png'

type GiftHamper = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  category: string;
};

const GiftingPage = () => {
  const giftHampers: GiftHamper[] = [
    {
      id: 1,
      name: 'Luxury Nut Collection',
      description: 'Premium assortment of almonds, cashews, pistachios, and walnuts',
      image: hamper1,
      rating: 4.9,
      category: 'Premium',
    },
    {
      id: 2,
      name: 'Spice Master\'s Choice',
      description: 'Exotic spices collection with saffron, cardamom, and premium blends',
      image: hamper2,
      rating: 4.8,
      category: 'Exotic',
    },
    {
      id: 3,
      name: 'Corporate Excellence',
      description: 'Perfect for corporate gifting with branded packaging options',
      image: hamper3,
      rating: 4.9,
      category: 'Corporate',
    },
    {
      id: 4,
      name: 'Festival Special',
      description: 'Traditional dry fruits and sweets for festive celebrations',
      image: hamper4,
      rating: 4.7,
      category: 'Festival',
    },
    {
      id: 5,
      name: 'Health & Wellness',
      description: 'Nutritious nuts, seeds, and organic spices for healthy living',
      image: hamper5,
      rating: 4.8,
      category: 'Wellness',
    },
    {
      id: 6,
      name: 'Gourmet Experience',
      description: 'Curated selection of rare spices and premium nuts from around the world',
      image: '/images/gourmet-hamper.jpg',
      rating: 4.9,
      category: 'Gourmet',
    },
  ];

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedProductForQR, setSelectedProductForQR] = useState<GiftHamper | null>(null);

  const handleQRView = (hamper: GiftHamper) => {
    setSelectedProductForQR(hamper);
    setIsQRModalOpen(true);
  };

  const handleCustomizeHamper = (hamper: GiftHamper) => {
    alert(`🚧 Customization for "${hamper.name}" isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`);
  };

  const handleQuoteRequest = (hamper: GiftHamper) => {
    alert(`📞 Quote request for "${hamper.name}" submitted! We'll contact you soon with pricing details.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-red-500 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Decorative Blobs - matching ProductsPage */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-40 h-40 sm:w-72 sm:h-72 bg-orange-400 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-96 sm:h-96 bg-red-400 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-4 mb-4 sm:mb-6 drop-shadow-lg">
              <Gift className="w-12 h-12 sm:w-16 sm:h-16" />
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Gifting & Hampers
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Create memorable moments with our elegantly curated gift hampers.
              Perfect for personal celebrations and corporate excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Categories */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              From corporate events to personal celebrations, find the perfect gift hamper
            </p>
          </motion.div>

          {/* Gift Categories Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
            {[
              { icon: Gift, title: 'Personal Gifts', desc: 'For loved ones' },
              { icon: Building, title: 'Corporate', desc: 'Business gifting' },
              { icon: Heart, title: 'Celebrations', desc: 'Special occasions' },
              { icon: Star, title: 'Premium', desc: 'Luxury hampers' },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-all"
              >
                <category.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 text-orange-500" />
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">{category.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hampers Section */}
      <section className="pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our Gift Collections
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selections designed to delight and impress
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {giftHampers.map((hamper, index) => (
              <motion.div
                key={hamper.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0 25px 60px -15px rgba(0,0,0,0.2)',
                }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Category Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                  <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg">
                    {hamper.category}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    alt={hamper.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    src={hamper.image}
                    onError={(e) => {
                      // Fallback to a default image if the specific image fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1689009755101-9fa2f09bcc86";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800 group-hover:text-orange-600 transition mb-2">
                      {hamper.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                      {hamper.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 mb-4 sm:mb-6">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-500" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{hamper.rating}</span>
                    <span className="text-gray-500 text-xs sm:text-sm ml-1">({Math.floor(Math.random() * 100) + 50} reviews)</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="w-full px-3 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all text-sm sm:text-base font-medium"
                      onClick={() => handleQuoteRequest(hamper)}
                    >
                      Ask for Quote
                    </button>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 px-3 py-2 sm:py-3 rounded-xl border border-orange-300 text-orange-600 hover:bg-orange-50 text-sm sm:text-base font-medium transition"
                        onClick={() => handleCustomizeHamper(hamper)}
                      >
                        Customize
                      </button>
                      <button
                        className="p-2 sm:p-3 rounded-xl border border-orange-300 text-orange-600 hover:bg-orange-50 transition flex-shrink-0"
                        onClick={() => handleQRView(hamper)}
                        title="View QR Code"
                      >
                        <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <button
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg text-sm sm:text-base md:text-lg font-medium transition inline-flex items-center gap-2"
              onClick={() => alert('🚧 Load More Coming Soon! This feature isn\'t ready yet, but you can request it in your next prompt. 🚀')}
            >
              <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
              View More Collections
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Need Something Custom?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Our team can create personalized gift hampers tailored to your specific needs and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 rounded-xl font-medium hover:bg-gray-100 transition text-sm sm:text-base">
                Contact Our Team
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-orange-600 transition text-sm sm:text-base">
                Browse Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/product/${selectedProductForQR.id}`}
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
    </div>
  );
};

export default GiftingPage;