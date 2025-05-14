"use client";

import useIsMobile from "@/helpers/useIsMobile";
import { SnackbarProvider } from "notistack";

export default function CustomSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: isMobile ? "center" : "left",
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
