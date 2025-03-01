"use client"
import Header from '@/components/Dashboard/Header'
import { Button } from '@/components/UI/Button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { S3_BASE_URL } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import SwapType from '@/components/discounts/SwapType'


const subOffers = [
  { title: '20% off up to ₹175', tag: 'New Users Only' },
  { title: '80% off up to ₹175', tag: 'Lunchtime Only' },
];

const page = () => {

  const router = useRouter();
  return (
    <div className="font-poppins px-2 ">
      <Header />
      <section className='px-8 py-4'>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold cursor-pointer" onClick={()=>{router.back()}}><ArrowLeft /></span>
          <h1 className="text-2xl font-bold">Offers and Discounts</h1>
         
        </div>
        <SwapType/>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Recommended Offers</h2>
          <div
            style={{ background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)" }}
            className="text-white p-6 rounded-lg flex justify-between items-center mt-3"
          >
            <div>
              <h3 className="text-lg font-semibold">30% off up to ₹75</h3>
              <p className="text-sm text-gray-200">Most Popular Offer</p>
              <Button className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 mt-2">
                Activate now
              </Button>
              <p className="text-sm mt-3 text-white">
                This offer is better than 80% of the restaurants around you.
              </p>
            </div>
            <Image src={`${S3_BASE_URL}/public/Illustration.png`} alt="Offer Image" width={100} height={100} />
          </div>

          <div className="flex gap-4 mt-4">
            {subOffers.map((offer, index) => (
              <div key={index} className="bg-green-500 cursor-pointer text-white px-4 h-[75px] flex flex-col justify-between py-3 rounded-md" style={{ background: "linear-gradient(75deg, #6AD58F 0%, #1B9E68 100%)" }}>
                <h4 className="text-md font-semibold">{offer.title}</h4>
                <p className="text-xs">{offer.tag}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Build your own offer</h2>
          <p className="text-sm text-gray-500">Set an offer that suits your business the best</p>
          <Button className="bg-blue-700 text-white px-4 py-2 mt-3" onClick={()=>{router.push("discounts/create-new")}}>Create new offer</Button>
        </div>
      </section>
    </div>
  )
}

export default page;
