import React from 'react';

export const EmptyState: React.FC<{ message?: string; subtitle?: string; className?: string }> = ({ 
  message = "No items found in this section",
  subtitle = "Check back soon, or adjust your department & semester filters.",
  className = ''
}) => (
  <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 mb-3">
      <circle cx="60" cy="60" r="50" className="fill-cream/80 dark:fill-dark-card stroke-sage/30 dark:stroke-dark-border" strokeWidth="2" />
      <path d="M35 78V48C35 43 39 38 46 38H78C85 38 89 43 89 48V78" className="stroke-forest dark:stroke-sage" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 78L89 78" className="stroke-forest dark:stroke-sage" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="52" x2="65" y2="52" className="stroke-sage dark:stroke-dark-border" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="62" x2="60" y2="62" className="stroke-sage dark:stroke-dark-border" strokeWidth="2" strokeLinecap="round" />
      <circle cx="76" cy="66" r="14" fill="#D7AA48" className="stroke-forest dark:stroke-white" strokeWidth="2.5" />
      <path d="M85 75L98 88" className="stroke-forest dark:stroke-white" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <p className="font-serif text-lg text-forest dark:text-sage font-medium mb-1">{message}</p>
    {subtitle && <p className="text-xs text-ink/60 dark:text-dark-text/60 max-w-sm">{subtitle}</p>}
  </div>
);
