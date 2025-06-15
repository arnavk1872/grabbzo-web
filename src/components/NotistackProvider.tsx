"use client";

import useIsMobile from "@/helpers/useIsMobile";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

export default function CustomSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Inject CSS to style all notistack messages with Poppins font
    const style = document.createElement('style');
    style.textContent = `
      .SnackbarContent-root {
        font-family: 'Poppins', sans-serif !important;
      }
      
      .notistack-Snackbar {
        font-family: 'Poppins', sans-serif !important;
      }
      
      .SnackbarItem-message {
        font-family: 'Poppins', sans-serif !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
