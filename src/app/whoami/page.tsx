"use client";
import React from "react";

const WhoAmIPage = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER;
  const isStaging = serverUrl === "staging";
  const isProduction = serverUrl === "production" || !serverUrl;
  
  const environment = isStaging ? "Staging" : "Production";
  const apiUrl = isStaging 
    ? "https://staging.api.grabbzo.com" 
    : "https://api.grabbzo.com";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Environment Info
        </h1>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">Environment:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isStaging 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {environment}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">Server URL:</span>
            <span className="text-sm text-gray-600 font-mono">
              {apiUrl}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">NEXT_PUBLIC_SERVER:</span>
            <span className="text-sm text-gray-600 font-mono">
              {serverUrl || "undefined"}
            </span>
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default WhoAmIPage;

