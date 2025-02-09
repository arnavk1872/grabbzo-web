import Header from "@/components/Details/Header";
import PoliciesSidebar from "@/components/PoliciesSidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex w-full">
        <PoliciesSidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
