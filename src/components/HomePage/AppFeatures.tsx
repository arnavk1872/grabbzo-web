"use client"

import React from "react";
import { S3_BASE_URL } from "@/lib/constants";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const AppFeatures: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="bg-white py-16 text-center font-poppins" ref={ref}>
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
        {[
          {
            img: "house-home.png",
            end: 100,
            label: "Restaurants",
          },
          {
            img: "location-pin-home.png",
            end: 5000,
            label: "Happy customers",
          },
          {
            img: "scooter-home.png",
            end: 10000,
            label: "Orders",
          },
        ].map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={`${S3_BASE_URL}/public/${feature.img}`}
              height={100}
              width={100}
              alt={feature.label}
            />

            <div className="text-xl font-semibold mt-4">
              <div className="font-bold text-black">
                {inView && (
                  <CountUp
                    end={feature.end}
                    duration={3}
                    separator=","
                  />
                )}
                +
              </div>
              <span className="text-gray-500">{feature.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppFeatures;
