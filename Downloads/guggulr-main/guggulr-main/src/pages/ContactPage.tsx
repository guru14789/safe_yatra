import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const contactInfo = [
    { icon: Phone, details: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: Mail, details: 'hello@guggulr.com', href: 'mailto:hello@guggulr.com' },
    { icon: MapPin, details: '123 Spice Street, NY', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    contactSubmissions.push({ ...formData, id: Date.now() });
    localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));

    toast({
      title: "✅ Message sent successfully!",
      description: "Thank you for contacting us. We'll get back to you shortly."
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Guggulr Global Foods - Get in Touch</title>
        <meta name="description" content="Contact Guggulr Global Foods for inquiries about premium nuts, spices, bulk orders, and corporate gifting. We're here to help with all your needs." />
        <meta property="og:title" content="Contact Guggulr Global Foods - Get in Touch" />
        <meta property="og:description" content="Contact Guggulr Global Foods for inquiries about premium nuts, spices, bulk orders, and corporate gifting. We're here to help with all your needs." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-yellow-200/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="font-display text-5xl font-extrabold text-gray-900">Get in Touch</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Have a question, a comment, or a craving? We'd love to hear from you. 
                Fill out the form or connect with us directly below.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 text-gray-700 hover:text-orange-600 transition-colors"
                    whileHover={{ x: 8 }}
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{info.details}</span>
                  </motion.a>
                ))}
              </div>

              <div className="flex space-x-6 pt-6">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    className="text-gray-500 hover:text-orange-600 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <social.icon className="w-7 h-7" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-orange-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email *"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message *"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  required
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
