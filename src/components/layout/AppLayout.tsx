import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { MobileSidebar } from './MobileSidebar';
import { useStudent } from '../../contexts/StudentContext';

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile } = useStudent();
  const isAdmin = profile.role === 'admin';

  return (
    <div className="flex h-screen bg-ivory dark:bg-dark-bg font-sans overflow-hidden transition-colors">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isAdmin={isAdmin} />
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isAdmin={isAdmin} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopNav onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scroll-smooth">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <Outlet />
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  );
};

export default AppLayout;
