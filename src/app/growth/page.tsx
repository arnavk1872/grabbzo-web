import Header from '@/components/Dashboard/Header';
import { Button } from '@/components/UI/Button';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { S3_BASE_URL } from '@/lib/constants';

const page = () => {
  return (
    <div>
      <Header />
      <div className="font-poppins px-12">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Grow</h1>
          <p className="text-gray-500 mt-2">CHOOSE HOW TO GROW YOUR BUSINESS</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offers and Discounts */}
            <div
              className="bg-blue-600 text-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full"
              style={{ background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)" }}
            >
              <div>
                <h2 className="text-lg font-semibold">Offers and discounts</h2>
                <p className="text-sm mt-1">Start your offers and grow your business</p>
              </div>
              <div className="flex justify-between">
                {/* Redirects to /growth/discounts */}
                <Link href="/growth/discounts">
                  <Button className="bg-white text-blue-600 hover:bg-blue-100 mt-4 px-6">
                    Explore now
                  </Button>
                </Link>
                <Image
                  src={`${S3_BASE_URL}/public/Growth.png`}
                  height={110}
                  width={110}
                  alt="Offers Illustration"
                />
              </div>

              <p className="text-sm mt-4 flex items-center gap-2">
                <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs">📈</span>
                Active offers are shown here !
              </p>
            </div>

            {/* Campaign */}
            <div
              className="bg-gradient-to-r text-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full"
              style={{ background: "linear-gradient(282deg, #F79C9A 0%, #861556 70.5%)" }}
            >
              <div>
                <h2 className="text-lg font-semibold">Campaign</h2>
                <p className="text-sm mt-1">Get seen by more customers on Grabbzo app and get more orders</p>
              </div>
              <div className="flex justify-between">
                <Link href="/growth/adCredits">
                <Button className="bg-white text-pink-600 hover:bg-pink-100 px-6 mt-4">Create now</Button>
                </Link>
                
                
                <Image
                  src={`${S3_BASE_URL}/public/Illustration.png`}
                  height={110}
                  width={110}
                  alt="Offers Illustration"
                />
              </div>

              <p className="text-sm mt-4 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Create your campaign !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
