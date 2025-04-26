import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import { S3_BASE_URL } from "@/lib/constants";
import AppFeatures from "./HomePage/AppFeatures";
import AppExperience from "./HomePage/AppExperience";
import image from "@public/image.png"

const HomePage = () => {
  const router = useRouter();

  const gotoLogin = () => {
    router.push("/restaurant");
  };

  return (
    <>
      <div className="relative w-full h-[90vh] font-poppins">
        <Image
          src={image}
          height={1000}
          width={1000}
          alt="home-main"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <button
          className="absolute cursor-pointer top-4 right-4 text-white text-[22px] px-4 py-2 rounded-lg font-poppins z-[100]"
          onClick={gotoLogin}
        >
          Manage Your Restaurant
        </button>

        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-center px-4">
          <Image
            src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
            width={500}
            height={300}
            style={{ objectFit: "cover", height: "120px" }}
            quality={100}
            alt="home-main"
            unoptimized
          />
          <p className="text-white font-bold text-4xl mt-3 max-w-[1200px]">
          India’s smartest dining companion for takeout, pre-dine-in, and  delivery in car.
          </p>
          <p className="text-white text-3xl mt-8">
            Explore delicious food & drinks near you
          </p>

          {/* <div
            className="flex items-center justify-center mt-6 gap-x-2"
            ref={searchRef}
          >
            <div className="relative flex items-center bg-white rounded-md p-2 shadow-lg w-[600px] max-w-full">
              <FaSearch className="text-gray-500 mx-3" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisine or a dish"
                className="flex-1 outline-none h-[32px] text-gray-700"
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 p-3 shadow-md">
                  <p className="text-gray-500">No data to show yet</p>
                </div>
              )}
            </div>
            <button className="flex gap-x-2 items-center bg-white px-4 py-2 rounded-md h-[48px] text-gray-400">
              <div className="flex items-center">
                <IoLocationSharp className="mr-2 text-green-500" />
                Location
              </div>
              <DownwardArrow />
            </button>
          </div> */}
        </div>
      </div>
      <AppFeatures/>
      <AppExperience/>
      <Footer isHome={true} />
    </>
  );
};

export default HomePage;
