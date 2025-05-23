import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      {children}
       <div id="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
