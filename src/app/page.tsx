"use client"
import React, { useEffect, useState } from "react";
import DownloadApp from "@/components/DownloadApp"; 
import HomePage from "@/components/HomePage";

const Home = () => {
  const [showDownloadApp, setShowDownloadApp] = useState(false);

  useEffect(() => {
    const checkSmallScreen = () => {
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isMobileDevice ;
    };

    setShowDownloadApp(checkSmallScreen());
    const handleResize = () => setShowDownloadApp(checkSmallScreen());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return showDownloadApp ? <DownloadApp /> : <HomePage />;
};

export default Home;
