import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Heart, Shield, Leaf } from 'lucide-react';

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const values = [
    { icon: Shield, title: 'Premium Quality', description: 'We source only the finest nuts and spices from trusted farms worldwide.' },
    { icon: Heart, title: 'Health & Wellness', description: 'Our products support your journey to a healthier lifestyle.' },
    { icon: Leaf, title: 'Sustainability', description: 'We partner with eco-conscious suppliers and use sustainable packaging.' },
    { icon: Globe, title: 'Global Sourcing', description: 'Bringing you authentic flavors from the world\'s finest growing regions.' }
  ];

  const textRevealVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Helmet>
        <title>About Guggulr Global Foods - Our Story & Mission</title>
        <meta name="description" content="Learn about Guggulr Global Foods' journey, mission, and commitment to bringing premium nuts, spices, and healthy products from around the world." />
        <meta property="og:title" content="About Guggulr Global Foods - Our Story & Mission" />
        <meta property="og:description" content="Learn about Guggulr Global Foods' journey, mission, and commitment to bringing premium nuts, spices, and healthy products from around the world." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-x-hidden">
        <section className="relative h-[60vh] overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: parallaxY }}>
            <img  alt="A vibrant collage of spices and nuts from around the world" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1636924271402-d639875aa2bb" />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-5xl md:text-7xl font-bold mb-4"
            >
              Our Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl max-w-3xl"
            >
              From Global Farms to Your Table, with Passion and Integrity.
            </motion.p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={textRevealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-center space-y-4 text-gray-600 leading-relaxed text-lg"
            >
              <p>
                Guggulr Global Foods was born from a simple yet powerful vision: to make the world's finest nuts, spices, and healthy foods accessible to everyone. Our journey began with a passion for authentic flavors and a commitment to quality that knows no borders.
              </p>
              <p>
                From the almond orchards of California to the saffron fields of Kashmir, we build direct relationships with farmers who share our dedication. Today, Guggulr is a bridge between these amazing producers and health-conscious consumers worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from sourcing to delivery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-2xl p-6 text-center hover-lift group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;