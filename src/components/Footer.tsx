import React from "react";
import logo from "public/Logo.jpg";
import Image from "next/image";
import Link from "next/link";
import BlueMail from "./Icons/BlueMail";
import BlueMobile from "./Icons/BlueMobile";
import {
  Instagram,
  Linkedin,
  LinkedinIcon,
  LucideLinkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <div>
      <div className="my-10 px-16 flex justify-between border-t-2">
        <div className="pt-8">
          <Image src={logo} alt="logo" />
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
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/pricing"
              >
                Pricing
              </Link>
            </div>
          </div>
          <div>
            <h6 className="text-lg font-semibold underline underline-offset-4 mb-5">
              Learn More
            </h6>
            <div className="flex flex-col gap-2 text-gray-600">
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/guidelines-and-policy"
              >
                Guidelines and Policy
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/channel-partner-agreement"
              >
                Channel Partner Agreement
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/terms-of-services"
              >
                Terms of Services
              </Link>
              <Link
                className="hover:underline hover:underline-offset-4"
                href="/cancellation-and-refund-policy"
              >
                Cancellation and Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-center mb-10 text-gray-600">
        By continuing past this page, you agree to our Terms of Service,
        Cancellation and Refund Policy and Privacy Policy. All trademarks are
        properties of their respective owners. 2024-2026 © Grabbzo™ Ltd. All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
