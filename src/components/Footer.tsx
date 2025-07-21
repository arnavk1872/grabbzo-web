"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlueMail from "./Icons/BlueMail";
import BlueMobile from "./Icons/BlueMobile";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { S3_BASE_URL } from "@/lib/constants";
import { usePathname } from "next/navigation";

interface FooterProps {
  isHome?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isHome }) => {
  const pathname = usePathname();
  const hiddenPaths = ["/", "/about"];

  return (
    <div className={`font-poppins ${isHome ? "bg-[#FCEBC6]" : ""}`}>
      <div className="px-6 md:px-16 flex flex-col md:flex-row justify-between border-t-2 pt-8 gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:max-w-xs">
          <Image
            src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
            height={120}
            width={120}
            alt="Grabbzo logo"
          />
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@grabbzo.com"
            className="flex gap-2 text-blue-500 items-center underline underline-offset-4 hover:text-blue-700"
          >
            <BlueMail /> contact@grabbzo.com
          </Link>
          <Link
            href="tel:+918899314024"
            className="flex gap-2 text-blue-500 items-center underline underline-offset-4 hover:text-blue-700"
          >
            <BlueMobile /> +91-8899314024
          </Link>
          <div>
            <h6 className="text-lg font-semibold uppercase underline underline-offset-4 mt-4">
              Social Links
            </h6>
            <div className="flex gap-4 mt-3">
              <Link
                href="https://www.linkedin.com/company/grabbzo/"
                target="_blank"
                className="hover:opacity-50"
              >
                <Linkedin />
              </Link>
              <Link
                href="https://www.instagram.com/grabbzo?igsh=YW5heDZtbDIxcTIz"
                className="hover:opacity-50"
                target="_blank"
              >
                <Instagram />
              </Link>
              <Link
                href="https://x.com/grabbzo"
                className="hover:opacity-50"
                target="_blank"
              >
                <Twitter />
              </Link>
            </div>
            <div className={`flex gap-3 -ml-2 mb-2 mt-6 ${isHome ? "hidden":"block"}`}>
              <Link className="cursor-pointer" href={"https://play.google.com/store/apps/datasafety?id=com.grabbzo"}>
            <Image
              src={`${S3_BASE_URL}/public/play_store.png`}
              height={170}
              width={142}
              alt="Grabbzo logo"
            />
            </Link>
            <Link className="cursor-pointer mt-[7px]" href={"https://apps.apple.com/in/app/grabbzo-restaurant-partner/id6745562089"}>
            <Image
              src={`${S3_BASE_URL}/public/app_store.png`}
              height={120}
              width={120}
              alt="Grabbzo logo"
            />
            </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:mt-8 gap-8 md:w-[60%]">
          <div>
            <h6 className="text-lg font-semibold underline underline-offset-4 mb-3">
              About Grabbzo
            </h6>
            <div className="flex flex-col gap-2 text-gray-600">
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/about"
              >
                About Us
              </Link>
              {!hiddenPaths.includes(pathname) && (
                <Link
                  className="hover:underline hover:underline-offset-4"
                  href="/pricing"
                >
                  Pricing
                </Link>
              )}
            </div>
          </div>
          <div>
            <h6 className="text-lg font-semibold underline underline-offset-4 mb-3">
              Learn More
            </h6>
            <div className="flex flex-col gap-2 text-gray-600">
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/policies/guidelines-and-policy"
              >
                Guidelines and Policy
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/policies/privacy"
              >
                Privacy Policy
              </Link>
              {!hiddenPaths.includes(pathname) && (
                <Link
                  className="hover:underline hover:underline-offset-4"
                  href="/policies/channel-partner"
                >
                  Channel Partner Agreement
                </Link>
              )}
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/policies/terms-of-service"
              >
                Terms of Services
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/policies/cancellation-and-refund"
              >
                Cancellation and Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <p className="text-sm text-center pb-10 pt-6 text-gray-600 px-4 md:px-6">
        By continuing past this page, you agree to our Terms of Service,
        Cancellation and Refund Policy and Privacy Policy. All trademarks are
        properties of their respective owners. 2024-2026 © Grabbzo™ Ltd. All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
