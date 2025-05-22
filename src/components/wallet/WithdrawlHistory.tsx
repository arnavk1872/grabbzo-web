import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";

type Transaction = {
  id: number;
  bankName: string;
  transactionType: string;
  amount: string;
  logo: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    bankName: "SBI",
    transactionType: "Bank Account Debit",
    amount: "₹1,000",
    logo: "/sbi-logo.png",
  },
  {
    id: 2,
    bankName: "SBI",
    transactionType: "Bank Account Debit",
    amount: "₹1,000",
    logo: "/sbi-logo.png",
  },
  {
    id: 3,
    bankName: "SBI",
    transactionType: "Bank Account Debit",
    amount: "₹1,000",
    logo: "/sbi-logo.png",
  },
  {
    id: 4,
    bankName: "SBI",
    transactionType: "Bank Account Debit",
    amount: "₹1,000",
    logo: "/sbi-logo.png",
  },
  {
    id: 5,
    bankName: "SBI",
    transactionType: "Bank Account Debit",
    amount: "₹1,000",
    logo: "/sbi-logo.png",
  },
  {
    id: 6,
    bankName: "SBI",
    transactionType: "Bank Account Debit",
    amount: "₹1,000",
    logo: "/sbi-logo.png",
  },
];

const WithdrawlHistory: React.FC = () => {
  return (
    <div className=" p-4 bg-white rounded-lg shadow w-full font-poppins">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Withdrawals</h2>
        <select className=" border-borderColor rounded-[16px] p-1 text-[14px]">
          <option> 3 months</option>
          <option> 6 months</option>
          <option> 12 months</option>
        </select>
      </div>
      {/* <p className="text-gray-500 text-sm mb-2">Yesterday</p> */}
      <div className="space-y-3">
        {transactions.length == 0 ? (
          <div className="text-center">No recent Transactions</div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center pr-2"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <span className="text-gray-800 font-medium max-sm:w-[125px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {transaction.transactionType}
                </span>
              </div>
              <span className="text-gray-800 font-semibold">
                {transaction.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WithdrawlHistory;
