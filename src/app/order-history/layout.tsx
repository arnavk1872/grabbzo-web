import Header from "@/components/Dashboard/Header";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="">
      <Header storeStatus={false} />
      <div>{children}</div>
    </div>
  );
}
