import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { getStatus } from "@/helpers/api-utils";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const storeStatus = await getStatus();

  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex flex-1 pt-[64px]">
        <div className="hidden md:flex flex-shrink-0 w-auto min-w-[200px] mt-9 max-w-[25vw]">
          <Sidebar storeStatus={storeStatus} />
        </div>

        <main className="flex-1 h-[calc(100vh-64px)] overflow-x-hidden p-4 mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
