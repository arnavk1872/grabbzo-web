'use client'
import BackToHome from "@/components/BackToHome"
import Image from "next/image"
import apple from "@public/apple.png"
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
      <div className="flex items-center justify-center flex-col h-[100vh] font-poppins">
        <Image src={apple} alt={"Something went wrong"} height={300} width={300}/>
        <div className="flex items-center justify-center text-[52px] text-[#29246B] font-semibold">Something is technically Wrong! </div>
        <div>Thanks for Noticing! We're going to fix it up and have things back to normal soon.</div>
        <div>If you have any questions, please contact <span className="font-bold text-underline">support@grabbzo.com</span></div>
        <BackToHome/>
      </div>
  )
}