'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const router = useRouter();

  return (
    <motion.header 
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="flex items-center justify-center px-4 py-3 md:px-6 md:py-4">
        {/* Centered Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <img src="/assets/logo.png" alt="" className='w-32 h-8' />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
