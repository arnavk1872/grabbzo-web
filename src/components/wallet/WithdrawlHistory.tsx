"use client"

import React, { useEffect, useState } from "react";
import { getAllPayouts } from "@/helpers/api-utils";

type PayoutData = {
  id: number;
  amount: number;
  completed: boolean;
  timestamp: string;
};

interface WithdrawlHistoryProps {
  refreshTrigger?: number;
}

const WithdrawlHistory: React.FC<WithdrawlHistoryProps> = ({ refreshTrigger = 0 }) => {
  const [payouts, setPayouts] = useState<PayoutData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPayouts();
        setPayouts(response || []);
      } catch (error) {
        console.error("Error fetching payouts:", error);
        setPayouts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayouts();
  }, [refreshTrigger]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full font-poppins">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Withdrawals</h2>
        <select className="border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>3 months</option>
          <option>6 months</option>
          <option>12 months</option>
        </select>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : payouts.length === 0 ? (
          <div className="text-center py-4">No recent withdrawals</div>
        ) : (
          payouts.map((payout) => (
            <div
              key={payout.id}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">
                    Withdrawal #{payout.id}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(payout.timestamp)}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-gray-800 font-semibold">
                  ₹{payout.amount}
                </span>
                <span 
                  className={`text-xs px-2 py-1 rounded-full ${
                    payout.completed 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {payout.completed ? 'Completed' : 'Processing'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WithdrawlHistory;
