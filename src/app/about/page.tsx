import Image from "next/image";
import React from "react";
import commas from "public/commas.png";

const page = () => {
  return (
    <div className="">
      <div className="bg-green-600 px-20 py-10">
        <Image
          src={commas}
          width={128}
          height={128}
          alt={"commas"}
          unoptimized
          className="object-cover"
        />
        <p className="text-3xl text-white font-medium">
          Grabbzo is here to make your food journey easier, whether you're in
          the mood for a quick takeout, would rather eat in with a preorder, or
          would prefer the convenience of car delivery.
        </p>
      </div>
      <div className="px-20 mt-16">
        <h4 className="text-6xl font-semibold font-poppins">What We Do</h4>
        <div className="h-[4px] bg-black w-44 mt-2"></div>
        <p className="mt-10 text-3xl">
          At Grabbzo, we think delicious cuisine ought to be accessible with
          just a few clicks. To accommodate your dining preferences, we provide
          three main services:
        </p>
        <ul className="mt-10 space-y-5 text-2xl">
          <li>
            <strong>Takeout:</strong> Place an order at your preferred
            restaurant and have it delivered whenever it's convenient for you.
          </li>
          <li>
            <strong>Pre-Dine In:</strong> For a hassle-free dining experience at
            your preferred restaurant, order your meal in advance to avoid the
            wait.
          </li>
          <li>
            <strong>Car Delivery:</strong> Save time and worry while on the road
            by having your food delivered right to your car.
          </li>
        </ul>
      </div>
      <div className="mt-16 bg-gray-200 py-10">
        <h4 className="text-6xl font-semibold font-poppins text-center pb-10">
          Our Vision
        </h4>

        <p className="px-20 text-2xl text-justify">
          In our ideal world, eating is not the only activity; it is also an
          opportunity to savor the moment without any tension or delays. We want
          to give more than simple meals with Grabbzo; we're providing a
          quicker, easier, and more intelligent method to engage with the
          cuisine you love.
        </p>
      </div>
      <div className="my-16 px-20">
        <h4 className="text-6xl font-semibold font-poppins">Why Grabbzo?</h4>
        <div className="h-[4px] bg-black w-44 mt-5"></div>
        <ul className="mt-10 space-y-5 text-2xl">
          <li>
            <strong>Convenience:</strong> We provide you with various options to
            enjoy your meal on your terms, whether you're in a hurry or want to
            unwind.
          </li>

          <li>
            <strong>Quality:</strong> To guarantee that every meal is prepared
            with the best ingredients and attention to detail, we collaborate
            closely with nearby eateries and chefs.
          </li>
          <li>
            <strong>Technology:</strong> From menu browsing to order placement,
            our state-of-the-art technology guarantees a seamless, user-friendly
            experience.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
