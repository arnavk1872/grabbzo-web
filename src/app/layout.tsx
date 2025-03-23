import type { Metadata } from "next";
import "./globals.css";
import CustomSnackbarProvider from "@/components/NotistackProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Grabbzo",
  description: "Your favourite food App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="google-site-verification"
        content="wUUKwkNQ1XsgHvDHMjTK612NxSt5b73-9XoJEqev95k"
      />
      <Script
        strategy="lazyOnload"
        src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=XTdBfH"
      ></Script>
      <body className="bg-bgGray">
        <CustomSnackbarProvider>{children}</CustomSnackbarProvider>
      </body>
    </html>
  );
}
