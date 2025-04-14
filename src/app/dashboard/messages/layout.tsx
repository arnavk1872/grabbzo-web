
import React, { ReactNode } from "react";
import Sidebar from "@/components/Messages/Sidebar";

interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full overflow-y-hidden">
      <div className="flex">
        {/* <Sidebar /> */}
        {children}
      </div>
     
    </div>
  );
};

export default Layout;
