import React from 'react';

export const BookIllustration: React.FC<{ color?: string; className?: string }> = ({ 
  color = "#183D32", 
  className = '' 
}) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`}>
    <rect x="10" y="5" width="60" height="90" rx="4" fill={color} stroke="#252923" strokeWidth="2" />
    <rect x="15" y="5" width="5" height="90" fill="rgba(255,255,255,0.2)" />
    <path d="M25 20H60" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 30H50" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    <rect x="25" y="50" width="40" height="30" rx="2" fill="rgba(255,255,255,0.1)" />
  </svg>
);
