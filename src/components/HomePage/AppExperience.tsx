import React from "react";
import { S3_BASE_URL } from "@/lib/constants";

const features = [
  { image: `${S3_BASE_URL}/public/veg-mode-home.png` },
  { image: `${S3_BASE_URL}/public/car-delivery-home.png` },
  { image: `${S3_BASE_URL}/public/pre-dinein-home.png` },
  { image: `${S3_BASE_URL}/public/takeaway-home.png` },
  { image: `${S3_BASE_URL}/public/healthy-home.png` },
];

const AppExperience: React.FC = () => {
  return (
    <section className="bg-[#f6f8f3] py-16 text-center font-poppins" style={{ background: "linear-gradient(182deg, #8FA6321A 0%, #FFFFFF 70.5%)" }}>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 leading-snug mb-4">
          Your app experience starts here – <br />
          see what awaits!
        </h2>
        <p className="text-gray-500 text-md md:text-lg">
          Enjoy next-level food delivery with the innovative features built into
          our app.
        </p>
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => (
          <img
            key={index}
            src={feature.image}
            className="w-[500px] h-[200px] object-contain mb-4 rounded-md"
          />
        ))}
      </div>
    </section>
  );
};

export default AppExperience;
