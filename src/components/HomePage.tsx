import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import { S3_BASE_URL } from "@/lib/constants";
import AppFeatures from "./HomePage/AppFeatures";
import AppExperience from "./HomePage/AppExperience";
import image from "@public/image.png";

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
            India’s smartest dining companion for Takeout, Pre dine-in and
            Delivery in car.
          </p>
          <h1 className="text-white text-3xl mt-8">
            Explore delicious food & drinks near you
          </h1>
        </div>
      </div>
      <AppFeatures />
      <AppExperience />
      <Footer isHome={true} />
    </>
  );
};

export default HomePage;
