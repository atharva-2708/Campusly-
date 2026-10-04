import React from 'react';

export const CampusIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full max-w-[320px] ${className}`}>
    {/* Background sky / card */}
    <rect width="320" height="220" rx="20" className="fill-cream/50 dark:fill-dark-card/60" />
    
    {/* Sun */}
    <circle cx="56" cy="48" r="22" fill="#D7AA48" opacity="0.85" />
    
    {/* Distant Clouds */}
    <path d="M210 50C210 42 216 36 224 36C231 36 236 40 238 45C241 43 245 44 247 47C250 47 252 50 252 54C252 58 249 61 245 61H214C211 61 210 57 210 50Z" className="fill-white/80 dark:fill-white/20" />
    <path d="M120 35C120 30 124 26 129 26C133 26 137 29 138 32C140 31 143 32 144 34C146 34 148 36 148 39C148 42 146 44 143 44H123C121 44 120 41 120 35Z" className="fill-white/60 dark:fill-white/10" />

    {/* Rolling Campus Lawns */}
    <path d="M0 165C70 148 150 152 220 160C260 164 290 158 320 165V220H0V165Z" className="fill-sage/40 dark:fill-forest/30" />
    <path d="M0 180C90 170 180 185 320 172V220H0V180Z" className="fill-sage/60 dark:fill-forest/50" />

    {/* Campus Path / Promenade */}
    <path d="M160 158L120 220H200L160 158Z" className="fill-cream dark:fill-dark-border opacity-70" />

    {/* Main Academic Building */}
    <rect x="75" y="85" width="170" height="75" rx="4" className="fill-white dark:fill-dark-bg stroke-forest dark:stroke-sage" strokeWidth="2" />
    
    {/* Portico Gable / Pediment */}
    <polygon points="160,42 65,85 255,85" fill="#C66B4E" className="stroke-forest dark:stroke-sage" strokeWidth="2" strokeLinejoin="round" />
    
    {/* Clock Tower / Dome */}
    <rect x="148" y="24" width="24" height="20" rx="3" className="fill-cream dark:fill-dark-card stroke-forest dark:stroke-sage" strokeWidth="1.5" />
    <circle cx="160" cy="34" r="6" fill="#D7AA48" />
    <line x1="160" y1="31" x2="160" y2="34" stroke="#183D32" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="160" y1="34" x2="163" y2="34" stroke="#183D32" strokeWidth="1.2" strokeLinecap="round" />

    {/* Classical Columns */}
    <rect x="135" y="85" width="8" height="75" className="fill-cream dark:fill-dark-border" />
    <rect x="177" y="85" width="8" height="75" className="fill-cream dark:fill-dark-border" />

    {/* Building Entrance Doorway */}
    <path d="M148 160V125C148 118 172 118 172 125V160H148Z" fill="#183D32" />

    {/* Windows */}
    <rect x="90" y="100" width="16" height="22" rx="2" fill="#183D32" opacity="0.85" />
    <rect x="112" y="100" width="16" height="22" rx="2" fill="#183D32" opacity="0.85" />
    <rect x="192" y="100" width="16" height="22" rx="2" fill="#183D32" opacity="0.85" />
    <rect x="214" y="100" width="16" height="22" rx="2" fill="#183D32" opacity="0.85" />

    {/* Window Sills / Panes */}
    <line x1="90" y1="111" x2="106" y2="111" stroke="#EDE4D4" strokeWidth="1" />
    <line x1="112" y1="111" x2="128" y2="111" stroke="#EDE4D4" strokeWidth="1" />
    <line x1="192" y1="111" x2="208" y2="111" stroke="#EDE4D4" strokeWidth="1" />
    <line x1="214" y1="111" x2="230" y2="111" stroke="#EDE4D4" strokeWidth="1" />

    {/* Left Tree */}
    <circle cx="48" cy="155" r="18" fill="#183D32" opacity="0.9" />
    <circle cx="56" cy="142" r="14" fill="#6B8F71" />
    <rect x="49" y="165" width="4" height="22" fill="#8B7355" rx="1" />

    {/* Right Tree */}
    <circle cx="275" cy="150" r="22" fill="#183D32" opacity="0.9" />
    <circle cx="265" cy="138" r="16" fill="#6B8F71" />
    <rect x="272" y="165" width="5" height="24" fill="#8B7355" rx="1" />

    {/* Students on walkway */}
    <circle cx="138" cy="180" r="3.5" fill="#C66B4E" />
    <path d="M135 185C135 183 141 183 141 185V194H135V185Z" fill="#183D32" />
    
    <circle cx="178" cy="184" r="3.5" fill="#D7AA48" />
    <path d="M175 189C175 187 181 187 181 189V198H175V189Z" fill="#C66B4E" />
  </svg>
);
