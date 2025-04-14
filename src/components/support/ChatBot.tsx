"use client";
import React, { useState } from "react";
import { Button } from "../UI/Button";
import Link from "next/link";
import { questions } from "./questions";
import { Repeat2 } from "lucide-react";

type FAQ = {
  question: string;
  answer?: string;
  followUp?: FAQ[];
};

const fallbackContact = (
  <div className="mt-2 text-sm text-red-600">
    Still need help? Reach out to us:
    <br />
    📞 <b>+91-7889864398</b>
    <br />
    📧{" "}
    <Link
      className="font-semibold cursor-pointer"
      href="https://mail.google.com/mail/?view=cm&fs=1&to=support@grabbzo.com&su=Support%20Request&body=Hello%20Grabbzo%20Support%20Team"
    >
      support@grabbzo.com
    </Link>
  </div>
);

const GrabbzoChatBot: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [followUps, setFollowUps] = useState<FAQ[]>([]);
  const [queryResolved, setQueryResolved] = useState<null | boolean>(null);

  const handleClick = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setFollowUps(faq.followUp || []);
    setQueryResolved(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-2xl shadow-lg p-6 bg-white font-poppins">
      <div className="flex items-center justify-between">
        <div className="w-fit">
          <Button
            onClick={() => {
              setSelectedFAQ(null);
              setFollowUps([]);
              setQueryResolved(null);
            }}
            className=" text-green-600  rounded-md bg-white border-none shadow-none hover:bg-green-200 transition-all"
          >
            <Repeat2 width={32} height={32} />
          </Button>
        </div>
        <h2 className="text-2xl   font-bold mb-4 text-center text-LightGreen">
          Grabbzo Help Bot 🤖
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Show questions only when none is selected */}
      {!selectedFAQ && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Ask me something:</p>
          <div className="space-y-2">
            {questions.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleClick(faq)}
                className="w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedFAQ && (
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-700 font-semibold">Question:</p>
          <p className="text-gray-800 mb-2">{selectedFAQ.question}</p>

          <p className="text-gray-700 font-semibold">Answer:</p>
          <p className="text-gray-800 mt-1">{selectedFAQ.answer}</p>

          {followUps.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-700 font-semibold mb-2">
                Follow-up Questions:
              </p>
              <div className="space-y-2">
                {followUps.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(faq)}
                    className="w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resolution check */}
          {queryResolved === null && (
            <div className="mt-6">
              <p className="text-gray-700 font-semibold mb-2">
                Was your query resolved?
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => setQueryResolved(true)}
                  className="px-12 py-4  bg-green-500 text-white rounded-md text-[15px] hover:bg-green-600 transition-all"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setQueryResolved(false)}
                  className="px-12 py-4 bg-red-500 text-white text-[15px] rounded-md hover:bg-red-600 transition-all"
                >
                  No
                </Button>
              </div>
            </div>
          )}

          {queryResolved === false && (
            <div className="mt-4">{fallbackContact}</div>
          )}

          {queryResolved === true && (
            <div className="mt-4 text-green-600 font-medium">
              Glad I could help! 😊
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GrabbzoChatBot;
