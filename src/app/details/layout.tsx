
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      Sidebar
      <div className="bg-bgGray">{children}</div>
    </div>
  );
};

export default Layout;
