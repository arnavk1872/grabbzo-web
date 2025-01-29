"use client";

import { SnackbarProvider } from "notistack";

export default function CustomSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom", 
        horizontal: "left", 
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
