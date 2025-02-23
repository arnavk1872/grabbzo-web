"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import logo from "public/logo-white.png";
import ServiceOptions from "./HomePage/ServiceOptions";
import Footer from "./Footer";
import DownwardArrow from "./Icons/DownwardArrow";
import { S3_BASE_URL } from "@/lib/constants";

const HomePage = () => {
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const gotoLogin = () => {
    router.push("/restaurant");
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative w-full h-[75vh] font-poppins">
        <Image
          src={`${S3_BASE_URL}/public/image.png`}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="home-main"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <button
          className="absolute cursor-pointer top-4 right-4 text-white px-4 py-2 rounded-lg font-poppins z-[100]"
          onClick={gotoLogin}
        >
          Manage Your Restaurant
        </button>

        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-center px-4">
          <Image
            src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
            width={500}
            height={300}
            style={{ objectFit: "cover", height: "120px" }}
            quality={100}
            alt="home-main"
          />

          <p className="text-white text-3xl mt-3">
            Explore delicious food & drinks near you
          </p>

          <div
            className="flex items-center justify-center mt-6 gap-x-2"
            ref={searchRef}
          >
            <div className="relative flex items-center bg-white rounded-md p-2 shadow-lg w-[600px] max-w-full">
              <FaSearch className="text-gray-500 mx-3" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisine or a dish"
                className="flex-1 outline-none h-[32px] text-gray-700"
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 p-3 shadow-md">
                  <p className="text-gray-500">No data to show yet</p>
                </div>
              )}
            </div>
            <button className="flex gap-x-2 items-center bg-white px-4 py-2 rounded-md h-[48px] text-gray-400">
              <div className="flex items-center">
                <IoLocationSharp className="mr-2 text-green-500" />
                Location
              </div>
              <DownwardArrow />
            </button>
          </div>
        </div>
      </div>
      <ServiceOptions />
      <Footer />
    </>
  );
};

export default HomePage;
