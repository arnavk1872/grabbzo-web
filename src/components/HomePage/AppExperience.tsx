import React from "react";
import { S3_BASE_URL } from "@/lib/constants";

const features = [
  { image: `${S3_BASE_URL}/public/veg-mode-home.png`, description: "Veg mode" },
  { image: `${S3_BASE_URL}/public/car-delivery-home.png`, description: "Delivery in car" },
  { image: `${S3_BASE_URL}/public/pre-dinein-home.png`, description: "Dine in" },
  { image: `${S3_BASE_URL}/public/takeaway-home.png`, description: "Takeaway" },
  { image: `${S3_BASE_URL}/public/healthy-home.png`, description: "Healthy" },
];

const AppExperience: React.FC = () => {
  return (
    <section
      className="bg-[#f6f8f3] py-16 text-center font-poppins"
      style={{
        background: "linear-gradient(182deg, #8FA6321A 0%, #FFFFFF 70.5%)",
      }}
    >
      {/* Heading */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 leading-snug mb-4">
          Your app experience starts here – <br />
          see what awaits!
        </h2>
        <p className="text-gray-500 text-md md:text-lg">
          Enjoy next-level food delivery with the innovative features built into our app.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 sm:gap-6 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={feature.image}
              alt={feature.description}
              className="w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] object-contain mb-2 rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppExperience;
