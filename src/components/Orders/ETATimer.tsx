"use client"
import React, { useState, useEffect } from "react";

type ETATimerProps = {
  targetTime: number; 
};

const ETATimer: React.FC<ETATimerProps> = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const now = new Date().getTime();
    return Math.max(targetTime - now, 0);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max(targetTime - now, 0);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="p-4 text-center font-poppins">
      <p className="text-[36px] ">{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default ETATimer;
