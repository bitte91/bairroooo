import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './SplashScreen.css';

interface SplashScreenProps {
  isVisible: boolean;
  onLoadingComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isVisible,
  onLoadingComplete,
}) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onLoadingComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isVisible, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="splash-background">
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob blob-3" />
      </div>

      <div className="splash-content">
        <motion.div
          className="splash-logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <div className="logo-icon">🎉</div>
        </motion.div>

        <motion.h1
          className="splash-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
        >
          Conecta Vila
        </motion.h1>

        <motion.p
          className="splash-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
          }}
        >
          Sua comunidade, mais conectada
        </motion.p>

        <motion.div
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.6,
          }}
        >
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </motion.div>
      </div>
    </motion.div>
  );
};
