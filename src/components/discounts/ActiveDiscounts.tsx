import React from "react";

interface Offer {
  id: string;
  title: string;
  startDate: string;
  expiry: string;
  applicable: string;
  minOrderValue: string;
}

interface ActiveDiscountsProps {
  activeOffers: Offer[];
}

const ActiveDiscounts: React.FC<ActiveDiscountsProps> = ({ activeOffers }) => {
  return (
    <div>
      {activeOffers.map((offer) => (
        <div key={offer.id} className="p-2 text-white mt-4 relative">
          <div
            className="flex justify-between p-6 rounded-lg"
            style={{
              background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)",
            }}
          >
            <div>
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <p className="text-sm">Start Date: {offer.startDate}</p>
            </div>
            <span className="bg-green-300 text-green-900 px-6 flex items-center rounded-md font-semibold">
              Active
            </span>
          </div>

          <p className="mt-4 text-gray-600">
            This offer expires in <b>{offer.expiry}</b>
          </p>
          <p className="text-gray-700 mt-2">
            <b>Offers applicable on:</b> {offer.applicable}
            <br />
            <b>Minimum order value:</b> {offer.minOrderValue}
          </p>

          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
              Renew this offer
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-100">
              Stop this offer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveDiscounts;
