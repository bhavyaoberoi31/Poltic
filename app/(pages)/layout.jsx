'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useRedirectIfAuthenticated } from '../lib/redirection';

function Layout({ children }) {
 useRedirectIfAuthenticated();

  return (
    <div className="flex flex-col h-screen w-screen bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <motion.main 
          className="flex-1 overflow-hidden md:ml-0 mb-16 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            delay: 0.2
          }}
        >
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="p-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  delay: 0.3
                }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;