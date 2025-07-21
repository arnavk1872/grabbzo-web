import React from "react";
import GreenTick from "../Icons/GreenTick";
import { Documents } from "./data";

const PartnerBox = () => {
  return (
    <div className="bg-white w-full max-w-[95%] sm:max-w-[80%] md:max-w-[55%] absolute left-1/2 transform -translate-x-1/2 top-[5%] md:top-[10%] shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col items-center">
      <h3 className="text-xl sm:text-2xl font-semibold text-center">
        Become a Partner – It only takes 10 minutes
      </h3>
      <p className="text-base sm:text-lg text-gray-600 text-center mt-2">
        Please have these ready for quick registration.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full">
        {Documents.map((item, key) => (
          <div key={key}>
            <p className="flex items-center gap-2 text-sm sm:text-base font-medium">
              <GreenTick /> {item.name}
            </p>

            {item.name === "GST Number" && (
              <p className="text-xs text-gray-500 mt-1">
                Require a GST?
                <a
                  href="https://reg.gst.gov.in/registration/"
                  className="text-blue-600 hover:underline pl-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Here
                </a>
              </p>
            )}

            {item.name === "FSSAI License" && (
              <p className="text-xs text-gray-500 mt-1">
                Don't have a FSSAI license?
                <a
                  href="https://foscos.fssai.gov.in/apply-for-lic-and-reg"
                  className="text-blue-600 hover:underline pl-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Here
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBox;
