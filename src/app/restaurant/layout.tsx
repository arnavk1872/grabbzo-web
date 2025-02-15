import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
