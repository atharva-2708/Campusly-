import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Compass, Map, User } from 'lucide-react';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Academics', path: '/academics' },
  { icon: Compass, label: 'Explore', path: '/explore-nearby' },
  { icon: Map, label: 'Campus', path: '/campus-map' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-dark-card border-t border-sage/20 dark:border-dark-border pb-safe z-20 shadow-[0_-4px_12px_rgba(24,61,50,0.05)] rounded-t-xl">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 min-w-[64px] rounded-lg transition-colors
                ${isActive 
                  ? 'text-forest dark:text-white' 
                  : 'text-ink/50 dark:text-dark-text/50 hover:bg-forest/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} className={`mb-1 ${isActive ? 'fill-forest/10' : ''}`} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
