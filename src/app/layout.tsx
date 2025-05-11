import type { Metadata } from "next";
import "./globals.css";
import CustomSnackbarProvider from "@/components/NotistackProvider";
import Script from "next/script";
import SchemaScript from "@/components/SchemaScript";

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
      {/*SEO TAGS START*/}
      <head>
      {/* <link rel="canonical" href="https://www.grabbzo.com/" /> */}

      <meta property="og:title" content="Grabbzo" />
      <meta
        property="og:description"
        content="Grabbzo is a smart dining platform that lets you pre-order meals or dine in at your favorite restaurants without the wait. Discover menus, book tables, and enjoy a seamless food experience with just a few taps."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.grabbzo.com/" />
      <meta
        property="og:image"
        content="https://publicimgbucket.s3.us-east-1.amazonaws.com/public/web-preview.png"
      />
      <meta property="og:site_name" content="Grabbzo" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2025-05-04T15:23:00Z" />

      <SchemaScript />
      </head>
      {/*SEO TAGS END*/}

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
