import React from "react";
import { FaHome, FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";
import { S3_BASE_URL } from "@/lib/constants";
import Image from "next/image";

const AppFeatures: React.FC = () => {
  return (
    <section className="bg-white py-16 text-center font-poppins">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
          Bringing taste to every table
        </h2>
        <p className="text-gray-500 text-lg">
          Grabbzo brings your favorite meals to your doorstep, making food
          ordering quick, easy, and hassle-free.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <Image
            src={`${S3_BASE_URL}/public/house-home.png`}
            height={100}
            width={100}
            alt="No of restaurants image"
          />

          <div className="text-xl font-semibold mt-4">
            <div className="font-bold text-black">100+</div>{" "}
            <span className="text-gray-500">Restaurants</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={`${S3_BASE_URL}/public/location-pin-home.png`}
            height={100}
            width={100}
            alt="No of restaurants image"
          />

          <div className="text-xl font-semibold mt-4">
            <div className="font-bold text-black">10,000+</div>{" "}
            <span className="text-gray-500">Happy customers</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={`${S3_BASE_URL}/public/scooter-home.png`}
            height={100}
            width={100}
            alt="No of restaurants image"
          />

          <div className="text-xl font-semibold mt-4">
            <div className="font-bold text-black">5,000+</div>{" "}
            <span className="text-gray-500">Orders</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
