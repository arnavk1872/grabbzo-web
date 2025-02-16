import React from "react";
import { FaMotorcycle, FaUtensils, FaShoppingBag } from "react-icons/fa";
import CarDelivery from "../Icons/CarDelivery";
import Pickup from "../Icons/Pickup";
import Dining from "../Icons/Dining";

interface ServiceOption {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const serviceOptions: ServiceOption[] = [
  {
    icon: <CarDelivery  />,
    title: "Car Delivery",
    description: "Food gets delivered directly to your car during takeaways",
  },
  {
    icon: <Dining />,
    title: "Dining",
    description: "Dine at city's favourite dining venues",
  },
  {
    icon: <Pickup />,
    title: "Take Away",
    description: "Short on time? Order ahead and pick up your food without waiting.",
  },
];

const ServiceOptions: React.FC = () => {
  return (
    <div className="bg-[#FCEBC6] py-8 rounded-tr-full mr-20 my-12 rounded-br-full flex justify-center gap-16 font-poppins">
      {serviceOptions.map((option, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center w-64"
        >
          <div className=" p-4 rounded-full mb-4">{option.icon}</div>
          <h3 className="font-semibold text-lg">{option.title}</h3>
          <p className="text-gray-600 text-sm">{option.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceOptions;
