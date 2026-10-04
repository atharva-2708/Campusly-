import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div 
    className={`card p-5 space-y-4 ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="h-4 bg-sage/20 rounded w-1/3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-sage/20 rounded w-3/4"></div>
      <div className="h-4 bg-sage/20 rounded w-full"></div>
      <div className="h-4 bg-sage/20 rounded w-5/6"></div>
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-6 w-16 bg-sage/20 rounded-full"></div>
      <div className="h-6 w-16 bg-sage/20 rounded-full"></div>
    </div>
  </motion.div>
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 3, className = '' }) => (
  <motion.div 
    className={`space-y-2 ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className="h-4 bg-sage/20 rounded" 
        style={{ width: i === lines - 1 ? '70%' : '100%' }}
      ></div>
    ))}
  </motion.div>
);

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`bg-sage/20 rounded-full ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    ></motion.div>
  );
};
