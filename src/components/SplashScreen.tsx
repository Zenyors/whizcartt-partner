
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a small delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    // Auto-dismiss splash screen after animation completes
    const dismissTimer = setTimeout(() => {
      onFinished();
    }, 2500);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(dismissTimer);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      {showContent && (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4"
          >
            <ShoppingCart className="h-16 w-16 text-blue-600" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-4xl font-bold text-center tracking-wider"
            style={{ fontFamily: "'MuseoModerno', cursive" }}
          >
            Whizcartt
          </motion.h1>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
