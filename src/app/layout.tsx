import type { Metadata } from "next";
import "./globals.css";

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
      <meta name="google-site-verification" content="wUUKwkNQ1XsgHvDHMjTK612NxSt5b73-9XoJEqev95k" />
      <body className="bg-bgGray" >{children}</body>
    </html>
  );
}
