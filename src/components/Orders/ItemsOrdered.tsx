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
      image: "https://via.placeholder.com/80", // Placeholder image URL
      rating: 4, // Rating out of 5
      reviews: 21,
    },
    {
      id: 2,
      title: "Chicken Special Double Burger",
      category: "BURGER",
      quantity: 1,
      price: 200,
      total: 200,
      image: "https://via.placeholder.com/80",
      rating: 4,
      reviews: 21,
    },
    {
      id: 3,
      title: "Chicken Special Double Burger",
      category: "BURGER",
      quantity: 1,
      price: 200,
      total: 200,
      image: "https://via.placeholder.com/80",
      rating: 4,
      reviews: 21,
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-white p-4 border border-borderColor rounded-[30px] ">
        <h3 className="text-lg font-medium border-b pb-2 mb-4">Items</h3>
        {dummyData.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            {/* Product Details */}
            <div className="flex-1">
              <span className="text-xs text-blue-500 font-medium">
                {item.category}
              </span>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              {/* Rating */}
              <div className="flex items-center text-yellow-400 text-sm">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
                <span className="ml-2 text-gray-400 text-xs">
                  ({item.reviews})
                </span>
              </div>
            </div>
            {/* Quantity, Price, Total */}
            <div className="flex space-x-8">
              <div className="text-gray-600">
               
                <p>{item.quantity}x</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Price</p>
                <p>${item.price}</p>
              </div>
              <div className="text-gray-800 font-semibold">
                <p className="font-medium">Total Price</p>
                <p>${item.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsOrdered;
