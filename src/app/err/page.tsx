"use client"
import React, { useEffect } from 'react';

const page = () => {
  useEffect(() => {
    // This will only run on the client-side
    throw new Error("Server Error Simulation");
  }, []);

  return (
    <div>
      SERVER ERROR SIMULATION
    </div>
  );
};

export default page;
