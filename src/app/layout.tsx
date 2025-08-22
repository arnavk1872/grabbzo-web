import type { Metadata } from "next";
import "./globals.css";
import CustomSnackbarProvider from "@/components/NotistackProvider";
import Script from "next/script";
import SchemaScript from "@/components/SchemaScript";
import { GlobalAudioUnlocker } from "@/helpers/useGlobalAudio";

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

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NDGQ9P3K');`,
          }}
        />
        {/* End Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDGQ9P3K"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <GlobalAudioUnlocker />
        <CustomSnackbarProvider>{children}</CustomSnackbarProvider>
      </body>
    </html>
  );
}
