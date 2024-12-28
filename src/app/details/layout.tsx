import Header from '@/components/Details/Header';
import Sidebar from '@/components/Details/Sidebar';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-neutral-200 min-h-screen'>
      <Header/>
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
