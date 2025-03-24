import { Check } from "lucide-react";

const features = [
  { name: "Cost/Day", silver: "10", gold: "9", diamond: "8", platinum: "6.5" },
  {
    name: "Ad Credits",
    silver: false,
    gold: false,
    diamond: "500",
    platinum: "750",
  },
  {
    name: "Comission on pre dine-in",
    silver: "4%",
    gold: "3%",
    diamond: "2.5%",
    platinum: "1.5%",
  },
  {
    name: "Additional Support",
    silver: "Standard Analytics",
    gold: "Enhanced Promotional Options",
    diamond: "Predictive Insights",
    platinum: "Personalized Marketing Stratergies",
  },
  {
    name: "Targeted Campaigns",
    silver: false,
    gold: false,
    diamond: true,
    platinum: true,
  },
  {
    name: "24 Hour Support",
    silver: false,
    gold: false,
    diamond: true,
    platinum: true,
  },
  {
    name: "Full Menu Setup",
    silver: false,
    gold: false,
    diamond: false,
    platinum: true,
  },
];

const CompareFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 p-5 font-poppins">
      <h2 className="text-2xl font-bold text-center mb-6">Compare Features</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 w-1/4"> </th>
              <th className="p-4 text-center">SILVER</th>
              <th className="p-4 text-center">GOLD</th>
              <th className="p-4 text-center">DIAMOND</th>
              <th className="p-4 text-center">PLATINUM</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 flex items-center">{feature.name}</td>
                <td className="p-4 text-center">
                  {typeof feature.silver === "boolean" ? (
                    feature.silver ? (
                      <Check className="text-blue-500 mx-auto" />
                    ) : (
                      "✗"
                    )
                  ) : (
                    feature.silver
                  )}
                </td>
                <td className="p-4 text-center">
                  {typeof feature.gold === "boolean" ? (
                    feature.gold ? (
                      <Check className="text-blue-500 mx-auto" />
                    ) : (
                      "✗"
                    )
                  ) : (
                    feature.gold
                  )}
                </td>
                <td className="p-4 text-center">
                  {typeof feature.diamond === "boolean" ? (
                    feature.diamond ? (
                      <Check className="text-blue-500 mx-auto" />
                    ) : (
                      "✗"
                    )
                  ) : (
                    feature.diamond
                  )}
                </td>
                <td className="p-4 text-center">
                  {typeof feature.platinum === "boolean" ? (
                    feature.platinum ? (
                      <Check className="text-blue-500 mx-auto" />
                    ) : (
                      "✗"
                    )
                  ) : (
                    feature.platinum
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareFeatures;
