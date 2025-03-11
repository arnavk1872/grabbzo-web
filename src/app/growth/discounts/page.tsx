import Header from "@/components/Dashboard/Header";
import { Button } from "@/components/UI/Button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import SwapType from "@/components/discounts/SwapType";

const subOffers = [
  { title: "20% off up to ₹150", tag: "NewCustomers", percentage: 20, maxCap: 150, coupon: "TRYNEW" },
  { title: "40% off up to ₹100", tag: "AllCustomers", percentage: 40, maxCap: 100, coupon: "GRABBIT" },
];

const page = () => {
  return (
    <div className="font-poppins px-2">
      <Header />
      <section className="px-8 py-4">
        <div className="flex items-center space-x-2">
          <Link href="/growth/discounts">
            <span className="text-xl font-bold cursor-pointer">
              <ArrowLeft />
            </span>
          </Link>
          <h1 className="text-2xl font-bold">Offers and Discounts</h1>
        </div>
        <SwapType />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Recommended Offers</h2>
          <div className="text-sm">Choose from our list of recommended offers</div>
          
          <Link href="/growth/discounts/create-new?percentage=30&maxCap=75&coupon=GRABNEW">
            <div
              style={{ background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)" }}
              className="text-white p-6 rounded-lg flex justify-between items-center mt-3 cursor-pointer"
            >
              <div>
                <h3 className="text-lg font-semibold">30% off up to ₹75</h3>
                <p className="text-sm text-gray-200">Most Popular Offer</p>
                <p className="text-sm text-gray-200">
                  Coupon: <span className="font-semibold">GRABNEW</span>
                </p>
                <p className="text-sm mt-3 text-white">
                  This offer is better than 80% of the restaurants around you.
                </p>
              </div>
              <Image src={`${S3_BASE_URL}/public/Illustration.png`} alt="Offer Image" width={100} height={100} />
            </div>
          </Link>

          <div className="flex gap-4 mt-4">
            {subOffers.map((offer, index) => (
              <Link
                key={index}
                href={`/growth/discounts/create-new?percentage=${offer.percentage}&maxCap=${offer.maxCap}&coupon=${offer.coupon}&appfor=${offer.tag}`}
              >
                <div
                  className="bg-green-500 cursor-pointer text-white px-4 h-[85px] flex flex-col justify-between py-3 rounded-md"
                  style={{ background: "linear-gradient(75deg, #6AD58F 0%, #1B9E68 100%)" }}
                >
                  <h4 className="text-md font-semibold">{offer.title}</h4>
                  <p className="text-sm text-gray-200">
                    Coupon: <span className="font-semibold">{offer.coupon}</span>
                  </p>
                  <p className="text-xs">{offer.tag.replace(/([a-z])([A-Z])/g, "$1 $2")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Build your own offer</h2>
          <p className="text-sm text-gray-500">Create an offer that suits your business the best</p>
          <Link href="/growth/discounts/create-new">
            <Button className="bg-blue-700 text-white px-4 py-2 mt-3">
              Create new offer
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default page;
