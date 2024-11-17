import React from 'react'
import SalesGraph from '../Icons/SalesGraph'

const SalesOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sales Overview</h2>
        <select className="text-gray-500">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="text-gray-700 mb-4">
        <p>Revenue: ₹24,523 <span className="text-green-500">↑ 12%</span></p>
        <p>Total Sales: ₹73,635 <span className="text-red-500">↓ 13%</span></p>
        <p>Refunded: ₹4,834 <span className="text-green-500">↑ 17%</span></p>
      </div>
      {/* Include the Sales Graph here */}
      <SalesGraph/>

    </div>
  )
}

export default SalesOverview
