"use client";
import BackToHome from "@/components/BackToHome";
import { S3_BASE_URL } from "@/lib/constants";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] font-poppins">
      <Image
        src={`${S3_BASE_URL}/public/apple.png`}
        alt="Apple"
        width={300}
        height={300}
      />

      <div className="flex items-center justify-center text-[52px] text-[#29246B] font-semibold">
        Something is technically Wrong!{" "}
      </div>
      <div>
        Thanks for Noticing! We're going to fix it up and have things back to
        normal soon.
      </div>
      <div>
        If you have any questions, please contact{" "}
        <span className="font-bold text-underline">support@grabbzo.com</span>
      </div>
      <BackToHome />
    </div>
  );
}
