import React from "react";
import BoostVisibility from "../Icons/BoostVisibility";
import MenuImages from "../Icons/MenuImages";
import Microphone from "../Icons/Microphone";

const features = [
  {
    icon: <BoostVisibility />,
    text: "Ad credits to boost visibility and increase orders.",
  },
  {
    icon: <MenuImages />,
    text: "Professional menu images for attracting customers and enhancing your restaurant’s appeal.",
  },
  {
    icon: <Microphone />,
    text: "Personalized marketing strategies for maximizing customer engagement and boosting sales.",
  },
];

const FeatureSection = () => {
  return (
    <div className="flex justify-center gap-32 my-24 font-poppins">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center max-w-xs"
        >
          {feature.icon}
          <p className="mt-2 text-gray-700">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
