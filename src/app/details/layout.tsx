import Header from "@/components/Details/Header";
import Sidebar from "@/components/Details/Sidebar";
import { SnackbarProvider } from "notistack";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-neutral-200 min-h-screen">
      {/* <SnackbarProvider maxSnack={1} preventDuplicate autoHideDuration={5000}> */}
      <Header />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
      {/* </SnackbarProvider> */}
    </div>
  );
};

export default Layout;
