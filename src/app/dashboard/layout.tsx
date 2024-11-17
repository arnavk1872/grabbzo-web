import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex mx-6 ">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
