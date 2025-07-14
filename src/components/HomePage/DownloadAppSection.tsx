import React from "react";
import { Card, CardContent } from "@/components/UI/card";
import Image from "next/image";
import qrcode from "@public/hovercode.png"
import { S3_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import AppleStoreButton from "@/components/AppleStoreButton";

export default function DownloadAppSection() {
  return (
    <section className="w-full bg-[#f6f9f1] py-12 font-poppins">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* TEXT BLOCK */}
        <div className="space-y-6 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Download the app now!
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Enjoy hassle‑free online ordering—<br className="hidden sm:inline" />
            exclusively on the Grabbzo app.
          </p>

          {/* STORE BADGES */}
            <div className={`flex gap-3 -ml-2 mb-2 mt-6 `}>
              <Link className="cursor-pointer" target="_blank" href={"https://play.google.com/store/apps/details?id=com.grabbzo.customer&hl=en_IN"}>
            <Image
              src={`${S3_BASE_URL}/public/play_store.png`}
              height={230}
              width={177}
              alt="Grabbzo logo"
            />
            </Link>
            <div className="mt-[10px]">
              <AppleStoreButton />
            </div>
            </div>
        </div>

        {/* PHONE MOCKUP */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {/* Phone Frame */}
            <div className="relative w-72 h-[550px] rounded-[3rem] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-2 shadow-2xl">
              {/* Screen Bezel */}
              <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-gray-100 to-gray-200 p-1">
                {/* Screen Content */}
                <div className="w-full h-full rounded-[2.3rem] bg-white overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="flex items-center gap-1">
                      
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="pt-8 px-6 pb-6 h-full flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="text-center mb-6">
                        
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Scan to download<br />the <b>Grabbzo </b>app
                        </p>
                      </div>
                      
                      {/* QR Code Container */}
                      <div className="relative">
                       
                          <div className="w-full h-full bg-white rounded-xl p-3 shadow-inner">
                            <Image 
                              src={qrcode} 
                              height={180} 
                              width={180} 
                              alt="Grabbzo QR Code"
                              className="rounded-lg"
                            />
                          </div>
                        
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 font-medium">
                          Available on iOS & Android
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Side Button */}
              <div className="absolute top-20 -right-1 w-1 h-8 bg-gray-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
