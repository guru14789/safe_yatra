import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Gift, Leaf, Truck, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCategory } from "@/context/CategoryContext";
import { ProductCircle } from "@/components/ui/product-circle";
import { FeatureCard } from "@/components/ui/feature-card";
import nutsBackground from "@/assets/nuts-background.jpg";
import giftBox from "@/assets/gift-box.jpg";
import mixedNuts from "@/assets/mixed-nuts.jpg";
import dates from "@/assets/dates.jpg";
import pistachios from "@/assets/pistachios.jpg";

const HomePage = () => {
  const { activeCategory, setActiveCategory } = useCategory();
  const { toast } = useToast();

  const featuredProducts = {
    nuts: [
      {
        id: 1,
        name: "Premium Almonds",
        desc: "Premium California almonds with rich flavor",
        image: dates,
    
      },
      {
        id: 2,
        name: "Cashew Delight",
        desc: "Creamy cashews from Kerala farms",
        image: dates,
      
      },
      {
        id: 3,
        name: "Pistachio Paradise",
        desc: "Turkish pistachios with natural taste",
        image: dates,
      
      },
    ],
    spices: [
      {
        id: 4,
        name: "Saffron Gold",
        desc: "Premium Kashmir saffron threads",
        image: dates,
       
      },
      {
        id: 5,
        name: "Cardamom Elite",
        desc: "Green cardamom pods from Western Ghats",
        image: dates,
       
      },
      {
        id: 6,
        name: "Cinnamon Bark",
        desc: "Ceylon cinnamon sticks with sweet aroma",
        image: dates,
       
      },
    ],
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "The quality is exceptional! Best nuts I've ever tasted.",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Perfect for corporate gifting. Our clients loved the hampers!",
    },
    {
      name: "Emily Davis",
      rating: 5,
      text: "Fresh spices that transformed my cooking completely.",
    },
  ];

  const handleExplore = () => {
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next visit! 🚀",
    });
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="min-h-screen relative overflow-hidden"
          style={{
            backgroundImage: `url(${nutsBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Overlay with smooth gradient & glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-brown)]/80 via-[var(--nuts-brown)]/70 to-[var(--warm-brown)]/90 backdrop-blur-[2px]" />

          <div className="relative z-10 container mx-auto px-6 py-20 lg:py-28">
            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Product Circles */}
              <div className="space-y-12">
                <div className="flex justify-center mb-10">
                  <ProductCircle
                    image={giftBox}
                    alt="Premium gift box with burgundy ribbon"
                    size="lg"
                    className="animate-float-soft shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-8 justify-items-center">
                  <ProductCircle
                    image={dates}
                    alt="Fresh Medjool dates"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-500"
                  />
                  <ProductCircle
                    image={mixedNuts}
                    alt="Mixed premium nuts"
                    size="md"
                    className="-mt-8 hover:rotate-6 transition-transform duration-500"
                  />
                  <ProductCircle
                    image={pistachios}
                    alt="Shelled pistachios"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Text + Features */}
              <div className="space-y-10">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-md mb-6 leading-tight">
                    Guggulr
                    <br />
                    <span className="text-accent relative inline-block">
                      Global Foods
                      {/* Accent underline glow */}
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full animate-pulse-glow" />
                    </span>
                  </h1>
                  <div className="bg-accent/90 backdrop-blur-md px-8 py-4 rounded-full inline-block mb-10 shadow-lg hover:scale-105 transition-transform">
                    <p className="text-accent-foreground font-semibold text-xl tracking-wide">
                      Nuts for your desk! Gifts for their heart!
                    </p>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FeatureCard
                    title="Your Gifting Journey Starts Here"
                    image={giftBox}
                    alt="Premium gift packaging"
                    className="h-52 hover:shadow-2xl hover:scale-105 transition-all duration-500"
                  />
                  <FeatureCard
                    title="Your Quality Day Begins Here"
                    image={mixedNuts}
                    alt="Premium mixed nuts"
                    className="h-52 hover:shadow-2xl hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* CTA Button */}
                <div className="flex justify-center lg:justify-start pt-8">
                  <Button
                    variant="explore"
                    size="lg"
                    className="text-lg px-10 py-6 group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105"
                    onClick={handleExplore}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </span>
                    {/* Button background glow */}
                    <span className="absolute inset-0 bg-gradient-to-r from-accent via-pink-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
<section className="relative py-20 bg-gradient-to-b from-white via-orange-50/60 to-white overflow-hidden">
  {/* Background Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-3xl opacity-30" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
        Explore Our <span className="gradient-text">Collections</span>
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Toggle between{" "}
        <span className="font-semibold">premium nuts</span> and
        <span className="font-semibold"> exotic spices</span> to
        discover nature’s finest treasures ✨
      </p>
      <div className="mt-6 w-28 sm:w-36 h-1 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
    </motion.div>

    {/* Toggle */}
    <div className="flex justify-center mb-14">
      <div className="relative flex bg-white/80 backdrop-blur-lg rounded-full shadow-lg p-1">
        {["spices", "nuts"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-6 sm:px-10 py-2.5 sm:py-3 rounded-full font-semibold transition-colors z-10 ${
              activeCategory === cat ? "text-white" : "text-gray-600"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        {/* Highlight */}
        <motion.div
          layoutId="category-highlight"
          className="absolute top-1 bottom-1 left-1 w-1/2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md"
          animate={{ x: activeCategory === "spices" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>
    </div>

    {/* Products Grid */}
    <motion.div
      key={activeCategory}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {featuredProducts[activeCategory].map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-orange-200"
        >
          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-200/30 via-transparent to-red-200/30 opacity-0 group-hover:opacity-100 transition duration-700 blur-xl" />

          {/* Product Image */}
          <div className="overflow-hidden rounded-xl mb-5 relative">
            <img
              alt={product.name}
              src={product.image}
              className="w-full h-48 sm:h-56 object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Floating badge */}
            <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              New
            </span>
          </div>

          {/* Title + Desc */}
          <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
            {product.desc}
          </p>

          {/* Price + Button */}
          <div className="flex justify-between items-center">
            <span className="text-xl sm:text-2xl font-extrabold gradient-text drop-shadow-sm">
              {product.price}
            </span>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg rounded-full px-5 sm:px-6 transition-transform duration-300 hover:scale-105"
            >
              View
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

        {/* Why Choose Guggulr */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
          {/* Decorative blurred circles */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-5xl font-extrabold text-gray-900 mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Guggulr?
                </span>
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                We deliver more than just products – we deliver trust, quality,
                and a touch of elegance to every experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: Leaf,
                  title: "100% Natural",
                  desc: "Pure, preservative-free ingredients for a healthier you.",
                },
                {
                  icon: CheckCircle,
                  title: "Premium Quality",
                  desc: "Handpicked from the world’s finest farms.",
                },
                {
                  icon: Gift,
                  title: "Perfect Gifting",
                  desc: "Luxurious hampers designed to impress on every occasion.",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  desc: "Freshness guaranteed with quick, reliable shipping.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-tr from-orange-500 to-red-500 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
<section className="py-24 relative bg-gradient-to-br from-orange-50 via-white to-orange-100">
  {/* Decorative background accents */}
  <div className="absolute -top-20 -right-32 w-[30rem] h-[30rem] bg-orange-200/30 rounded-full blur-3xl -z-10 animate-pulse" />
  <div className="absolute -bottom-24 -left-32 w-[28rem] h-[28rem] bg-red-200/30 rounded-full blur-3xl -z-10 animate-pulse" />

  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-20"
    >
      <h2 className="font-display text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
        What Our Customers Say
      </h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
        Thousands of happy customers trust <span className="font-semibold text-orange-600">Guggulr</span> 
        for unmatched quality, luxury, and taste. Here’s what they have to say:
      </p>
    </motion.div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="relative bg-white shadow-lg rounded-3xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
        >
          {/* Glowing gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />

          {/* Star rating */}
          <div className="flex justify-center mb-5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400 fill-current drop-shadow-md"
              />
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
            “{testimonial.text}”
          </p>

          {/* Customer Info */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg mb-3 shadow-md">
              {testimonial.name[0]}
            </div>
            <p className="font-semibold text-gray-900 text-lg">
              {testimonial.name}
            </p>
            <span className="text-sm text-gray-500">Verified Customer</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 overflow-x-hidden">
          {/* Decorative Glow Blobs */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-400/30 rounded-full blur-3xl animate-pulse delay-2000" />

          <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Heading */}
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
                Taste the Future of{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-100">
                  Premium Quality
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-orange-100/90 max-w-2xl mx-auto leading-relaxed">
                Discover world-class nuts, exotic spices, and elegant gift
                hampers. Elevate your snacking and gifting game with{" "}
                <span className="font-semibold text-white">
                  Guggulr Global Foods.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                <Link to="/products">
                  <Button
                  variant="outline"
                    size="lg"
                    className="relative bg-white text-orange-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-orange-200/50 hover:bg-orange-50 transition-all group"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                    className="relative bg-white text-orange-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-orange-200/50 hover:bg-orange-50 transition-all group"
                  onClick={handleExplore}
                >
                  Request Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
