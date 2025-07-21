
import Image from "next/image";
import Footer from "@/components/Footer";
import { S3_BASE_URL } from "@/lib/constants";
import AppExperience from "@/components/HomePage/AppExperience";  
import AppFeatures from "@/components/HomePage/AppFeatures";
import image from "@public/image.png";
import Link from "next/link";
import BlogSection from "@/components/aboutus/BlogSection";
import DownloadAppSection from "@/components/HomePage/DownloadAppSection";
import AppleStoreButton from "@/components/AppleStoreButton";

const page = () => {

  return (
    <>
      <div className="relative w-full h-[70vh] md:h-[90vh] font-poppins">
        <Image
          src={image}
          height={1000}
          width={1000}
          alt="home-main"
          style={{opacity: 0.9, objectFit: "cover"}}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <Link href={'/restaurant'}>
        <button
          className="absolute cursor-pointer top-4 right-4 text-white text-[14px] md:text-[22px] md:px-4 px-1 md:py-2 rounded-lg font-poppins z-[100]"
        >
          Manage Your Restaurant
        </button>
        </Link>

        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-center px-4">
          <img
            src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
            width={500}
            height={300}
            style={{ objectFit: "cover", height: "120px"}}
            alt="home-main"
          />
          <p className="text-white max-md:mx-4 font-bold text-xl md:text-4xl mt-3 max-w-[1200px]">
            India’s smartest dining companion for Takeout, Pre dine-in and
            Delivery in car.
          </p>
          <h1 className="text-white md:text-3xl mt-8">
            Explore delicious food & drinks near you
          </h1>
           <div className={`flex gap-3 -ml-2 mb-2 mt-6 `}>
              <Link className="cursor-pointer" href={"https://play.google.com/store/apps/details?id=com.grabbzo.customer&hl=en_IN"}>
            <Image
              src={`${S3_BASE_URL}/public/play_store.png`}
              height={230}
              width={177}
              alt="Grabbzo logo"
            />
            </Link>
            <AppleStoreButton />
            </div>
        </div>
      </div>
      {/* <AppFeatures /> */}

      <AppExperience />
      <DownloadAppSection/>
      <BlogSection/>
      <Footer isHome={true} />
    </>
  );
};

export default page;
