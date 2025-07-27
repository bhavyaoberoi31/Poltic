'use client';

import { motion } from 'framer-motion';
import Feed from '@/app/component/Feed';

function HomePage() {

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Content Feed */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Feed />
      </motion.div>
    </div>
  );
}

export default HomePage;