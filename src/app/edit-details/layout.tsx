import Header from "@/components/Dashboard/Header";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header storeStatus={false} />
      <div className="">{children}</div>
    </>
  );
}
