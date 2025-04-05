"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const OffersDiscounts = () => {
    const router = useRouter();
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
    <span
      className="text-xl font-bold cursor-pointer"
      onClick={() => router.push('/growth')}
    >
      <ArrowLeft />
    </span>
    <h1 className="text-2xl font-bold">Offers and Discounts</h1>
  </div>
  )
}

export default OffersDiscounts
