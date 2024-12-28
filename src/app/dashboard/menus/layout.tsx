import SwapType from '@/components/menu/SwapType';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='w-full'>
      <SwapType />
      {children}
    </div>
  );
};

export default Layout;
