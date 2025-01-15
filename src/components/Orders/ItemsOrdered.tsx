import React from "react";

const ItemsOrdered = () => {
  const dummyData = [
    {
      id: 1,
      title: "Chicken Special Double Burger",
      category: "BURGER",
      quantity: 3,
      price: 200,
      total: 600,
      image: "https://via.placeholder.com/80", 
      rating: 4, 
      reviews: 21,
    },
    {
      id: 2,
      title: "Butter chicken",
      category: "Non Veg",
      quantity: 1,
      price: 200,
      total: 200,
      image: "https://via.placeholder.com/80",
      rating: 4,
      reviews: 21,
    },
    {
      id: 3,
      title: "Red Sauce Pasta",
      category: "PASTA",
      quantity: 1,
      price: 200,
      total: 200,
      image: "https://via.placeholder.com/80",
      rating: 4,
      reviews: 21,
    },
  ];

  const totalAmount = dummyData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-4 mx-auto font-poppins 2xl:w-[40%]">
      <div className="bg-white p-4 border border-borderColor rounded-[30px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Items</th>
              <th className="text-right pb-2">Quantity</th>
              <th className="text-right pb-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                {/* Product Details */}
                <td className="flex items-center space-x-4 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-xs text-blue-500 font-medium">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <div className="flex items-center text-yellow-400 text-md">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                      <span className="ml-2 text-gray-400 text-xs">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>
                </td>
                {/* Quantity */}
                <td className="text-center">{item.quantity}</td>
                {/* Price */}
                <td className="text-right">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-right font-semibold py-4" colSpan={2}>
                Total Amount:
              </td>
              <td className="text-right font-bold text-lg">₹{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ItemsOrdered;
