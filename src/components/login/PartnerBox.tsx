import React from "react";
import GreenTick from "../Icons/GreenTick";
import { Documents } from "./data";

const PartnerBox = () => {
  return (
    <div className="bg-white w-[55%] absolute rounded-3xl left-1/2 transform -translate-x-1/2 top-[10%] shadow-xl flex flex-col items-center justify-center">
      <h3 className="text-2xl font-semibold pt-7">
        Become a Partner - It only takes 10 minutes
      </h3>
      <p className="text-lg text-gray-600">
        Please have these ready for quick registration.
      </p>
      <div className="grid grid-cols-3 justify-center pt-10 gap-x-10 gap-y-4 pb-7">
        {Documents.map((item, key) => (
          <div key={key}>
            <p className="flex items-center gap-2 text-base font-medium">
              <GreenTick /> {item.name}
            </p>
            {item.name === "GST Number" && (
              <p className="text-xs text-gray-500">
                Require a GST?
                <a
                  href="https://reg.gst.gov.in/registration/"
                  className="text-blue-600 hover:underline pl-1"
                  target="_blank"
                >
                  Apply Here
                </a>
              </p>
            )}
            {item.name === "FSSAI Licence" && (
              <p className="text-xs text-gray-500">
                Don't have a FSSAI licence?
                <a
                  href="https://foscos.fssai.gov.in/apply-for-lic-and-reg"
                  className="text-blue-600 hover:underline pl-1"
                  target="_blank"
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
