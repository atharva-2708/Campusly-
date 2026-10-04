import React from 'react';

type BadgeVariant = 'forest' | 'terracotta' | 'mustard' | 'lavender' | 'sage' | 'urgent';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'forest',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  
  const variantClasses = {
    forest: 'bg-forest/10 text-forest border-forest/20',
    terracotta: 'bg-terracotta/10 text-terracotta border-terracotta/20',
    mustard: 'bg-mustard/20 text-ink border-mustard/30',
    lavender: 'bg-lavender/20 text-ink border-lavender/30',
    sage: 'bg-sage/20 text-forest border-sage/30',
    urgent: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
