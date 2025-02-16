import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { getStatus } from "@/helpers/api-utils";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {

  // const storeStatus = await getStatus();

  return (
    <>
      <Header />
      <div className="flex  sticky w-full  ">
        <Sidebar/>
        {children}
      </div>
    </>
  );
}
