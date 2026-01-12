import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './AnimatedCard.css';

interface AnimatedCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
  variant?: 'default' | 'highlight' | 'gradient';
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onClick,
  className = '',
  delay = 0,
  variant = 'default',
}) => {
  return (
    <motion.div
      className={`animated-card animated-card--${variant} ${className}`}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      onClick={onClick}
    >
      <div className="card-ripple" />
      <div className="card-content">{children}</div>
      <div className="card-border" />
    </motion.div>
  );
};

export default AnimatedCard;
