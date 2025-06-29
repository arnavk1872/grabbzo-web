import React from "react";
import { Card, CardContent } from "@/components/UI/card";
import Image from "next/image";
import qrcode from "@public/hovercode.png"
import { S3_BASE_URL } from "@/lib/constants";
import Link from "next/link";

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
            exclusively on the Grabzzo app.
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
            <Link className="cursor-pointer mt-[10px]" href={"https://apps.apple.com/in/app/grabbzo-restaurant-partner/id6745562089"}>
            <Image
              src={`${S3_BASE_URL}/public/app_store.png`}
              height={140}
              width={145}
              alt="Grabbzo logo"
            />
            </Link>
            </div>
        </div>

        {/* PHONE MOCKUP */}
        <div className="flex justify-center md:justify-end">
          <Card className="w-72 h-[500px] rounded-3xl shadow-lg relative overflow-hidden">
            {/* Screen */}
            <CardContent className="flex flex-col items-center pt-16 px-4">
              <p className="text-center text-sm font-semibold text-muted-foreground mb-4">
                Scan the QR and<br />download the app
              </p>
              {/* QR Placeholder */}
              <div className="w-45 h-45 border border-dashed border-gray-300 rounded-lg flex mx-2 items-center justify-center">
                <Image src={qrcode} height={220} width={220} alt="Grabbzo QR Code"/>
              </div>
            </CardContent>
            {/* Camera Notch */}
            <span className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gray-300" />
          </Card>
        </div>
      </div>
    </section>
  );
}
