
import React, { ReactNode } from "react";
import CustomerSatisfaction from "@/components/Orders/CustomerSatisfaction";
import Orders from "@/components/Orders/Orders";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="flex">
        <Orders />
        <div className="2xl:block hidden"><CustomerSatisfaction /></div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
