import Header from "@/components/Details/Header";
import PoliciesSidebar from "@/components/PoliciesSidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="flex-none">
        <PoliciesSidebar />
      </div>
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default Layout;
