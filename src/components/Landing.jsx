import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Users, Shield, DollarSign, Search, MessageCircle, CheckCircle, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../assets/bookTree.jpg';
import image2 from '../assets/book2.jpg';
import image4 from '../assets/book3.jpg';
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate =useNavigate()
  
  const carouselImages = [
    image1,
    image2,
    image4
  ];

  const sellingSteps = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Register Book",
      description: "Add your book details and photos"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Accept Request",
      description: "Review and approve buyer requests"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verify User",
      description: "Meet the buyer for verification"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Sell the Book",
      description: "Complete the transaction safely"
    }
  ];

  const buyingSteps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Search the Book",
      description: "Find your desired book easily"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Request the Book",
      description: "Send a request to the seller"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Verify Seller",
      description: "Meet and verify the book condition"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Purchase It",
      description: "Complete your purchase securely"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10"></div>
        
        {/* Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.2, filter: "blur(3px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={carouselImages[currentSlide]} 
              alt="Book carousel" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        

        
        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-20 text-center px-8 max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
          >
           UniSwap
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Connect, Trade, and Discover - Your Ultimate Book Exchange Community
          </motion.p>
          <motion.div 
            variants={scaleIn}
            className="w-32 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto rounded-full"
          />
        </motion.div>
      </section>

      {/* Selling Process Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={slideInLeft}
              className="text-4xl md:text-5xl font-bold text-center mb-4"
            >
              <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                Sell Your Books
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-center text-gray-400 mb-16 max-w-2xl mx-auto"
            >
              Turn your old books into cash with our secure selling process
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {sellingSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 hover:border-green-500 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6 mx-auto"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-green-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-center leading-relaxed">
                    {step.description}
                  </p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {index + 1}
                  </motion.div>
                </div>
                
                {index < sellingSteps.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-600 transform -translate-y-1/2 origin-left"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Buying Process Section */}
      <section className="py-20 px-8 bg-gradient-to-l from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={slideInRight}
              className="text-4xl md:text-5xl font-bold text-center mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Buy Your Books
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-center text-gray-400 mb-16 max-w-2xl mx-auto"
            >
              Find and purchase your favorite books with confidence
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {buyingSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                  <motion.div 
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 mx-auto"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-purple-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-center leading-relaxed">
                    {step.description}
                  </p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {index + 1}
                  </motion.div>
                </div>
                
                {index < buyingSteps.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 transform -translate-y-1/2 origin-left"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={scaleIn}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Ready to Start?
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of book lovers who trust our platform for safe and secure transactions
          </motion.p>
          
          <motion.button 
            onClick={()=>navigate('/login')}
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <span className="relative z-10">Get Started</span>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="ml-3 transform transition-transform duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-8 flex justify-center space-x-2"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5,
                  delay: 0.2,
                  ease: "easeInOut"
                }
              }}
              className="w-2 h-2 bg-purple-500 rounded-full"
            />
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5,
                  delay: 0.4,
                  ease: "easeInOut"
                }
              }}
              className="w-2 h-2 bg-pink-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;