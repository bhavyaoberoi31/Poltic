'use client';

import { motion } from 'framer-motion';

function AboutPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <motion.div
        className="w-full h-full p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            About Us
          </motion.h1>
          
          <motion.div 
            className="space-y-6 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="text-lg leading-relaxed">
              Welcome to our platform, where we bring together communities and foster meaningful connections 
              through shared interests and engaging content.
            </p>
            
            <p className="text-lg leading-relaxed">
              Our mission is to create a space where people can express themselves, discover new perspectives, 
              and build lasting relationships with like-minded individuals from around the world.
            </p>
            
            <p className="text-lg leading-relaxed">
              We believe in the power of authentic communication and strive to provide tools that enable 
              genuine interactions while maintaining a safe and inclusive environment for all users.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutPage;