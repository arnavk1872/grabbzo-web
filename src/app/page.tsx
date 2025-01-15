import React from "react";
import ComingSoon from "@/components/ComingSoon";
import DownloadApp from "@/components/DownloadApp"; // Assuming you have a DownloadApp component

const isSmallScreen = () => {
  if (typeof navigator !== "undefined" && typeof window !== "undefined") {
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSmallWidth = window.innerWidth < 1024;
    return isMobileDevice || isSmallWidth;
  }
  return false;
};

const Home = () => {
  const showDownloadApp = isSmallScreen();

  return showDownloadApp ? <DownloadApp /> : <ComingSoon />;
};

export default Home;
