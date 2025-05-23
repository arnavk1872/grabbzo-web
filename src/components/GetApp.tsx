"use client";

const GetApp = () => {
  const scrollToFooter = () => {
    const footer = document.getElementById("footer-section");
    footer?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToFooter}
      className="absolute top-6 right-6  text-white  px-4 py-2 rounded-full border shadow-md transition"
    >
      Get the App
    </button>
  );
};

export default GetApp;
