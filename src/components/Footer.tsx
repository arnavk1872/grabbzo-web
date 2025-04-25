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
      <div className=" px-16 flex justify-between border-t-2">
        <div className="pt-8">
          <Image
            src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
            height={120}
            width={120}
            alt="logo"
          />
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@grabbzo.com"
            className="flex gap-3 text-blue-500 items-center underline underline-offset-4 hover:text-blue-700"
          >
            <BlueMail /> contact@grabbzo.com
          </Link>
          <Link
            href="tel:+917889864398"
            className="flex gap-3 text-blue-500 items-center underline underline-offset-4 hover:text-blue-700 my-5"
          >
            <BlueMobile /> +91-7889864398
          </Link>
          <h6 className="text-lg font-semibold uppercase underline underline-offset-4">
            Social Links
          </h6>
          <div className="flex gap-4 mt-3">
            <Link
              href={"https://www.linkedin.com/company/grabbzo/"}
              className="hover:opacity-50"
            >
              <Linkedin />
            </Link>
            <Link
              href={"https://www.instagram.com/grabbzo?igsh=YW5heDZtbDIxcTIz"}
              className="hover:opacity-50"
            >
              <Instagram />
            </Link>
            <Link
              href={"https://x.com/Grabbzo125105?t=y8hXBAIiY2zzZ-JxaMBAEg&s=09"}
              className="hover:opacity-50"
            >
              <Twitter />
            </Link>
          </div>
        </div>
        <div className="pt-16 flex w-[40%] justify-around">
          <div>
            <h6 className="text-lg font-semibold underline underline-offset-4 mb-5">
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
            <h6 className="text-lg font-semibold underline underline-offset-4 mb-5">
              Learn More
            </h6>
            <div className="flex flex-col gap-2 text-gray-600">
              <Link
                className="hover:underline hover:underline-offset-4"
                href="policies/guidelines-and-policy"
              >
                Guidelines and Policy
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="policies/privacy"
              >
                Privacy Policy
              </Link>
              {!hiddenPaths.includes(pathname) && (
                <Link
                  className="hover:underline hover:underline-offset-4"
                  href="policies/channel-partner"
                >
                  Channel Partner Agreement
                </Link>
              )}
              <Link
                className="hover:underline hover:underline-offset-4"
                href="policies/terms-of-service"
              >
                Terms of Services
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="policies/cancellation-and-refund"
              >
                Cancellation and Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-center pb-10 pt-4 text-gray-600 px-6">
        By continuing past this page, you agree to our Terms of Service,
        Cancellation and Refund Policy and Privacy Policy. All trademarks are
        properties of their respective owners. 2024-2026 © Grabbzo™ Ltd. All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
