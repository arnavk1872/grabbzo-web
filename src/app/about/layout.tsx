import Header from "@/components/login/Header";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
