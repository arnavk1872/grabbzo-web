import Image from "next/image";
import Link from "next/link";
import { S3_BASE_URL } from "@/lib/constants";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/aboutus/Carousel";
import WorkWithUs from "@/components/aboutus/WorkWithUs";
import Dining from "@/components/aboutus/Dining";
import Pickup from "@/components/aboutus/Pickup";
import CarDelivery from "@/components/aboutus/CarDelivery";
import BlogSection from "@/components/aboutus/BlogSection";

const Page = () => {
  return (
    <div>
      <h1 className="hidden">About us Page</h1>
      <div className="relative w-full h-[80vh] font-poppins">
        <Image
          src={`${S3_BASE_URL}/public/about-us-header.png`}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="home-main"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <Image
          src={`${S3_BASE_URL}/public/Grabbzo-white-logo.png`}
          width={1000}
          height={1000}
          style={{
            objectFit: "cover",
            height: "60px",
            padding: "10px",
            zIndex: 100,
          }}
          quality={100}
          className="absolute h-40 w-40 top-4 left-4 z-50 object-cover"
          alt="home-main"
        />

        <Link
          href="/"
          className="absolute cursor-pointer sm:block hidden text-lg top-4 right-44 text-white px-4 py-2 rounded-lg font-poppins z-[100]"
        >
          Home
        </Link>
        <a
          href="#work-with-us"
          className="absolute cursor-pointer text-lg top-4 sm:block hidden right-4 text-white px-4 py-2 rounded-full font-poppins z-[100] border border-white"
        >
          Work with us
        </a>

        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white font-semibold text-4xl sm:text-6xl mt-3">
            From an Idea to a Revolution
          </p>
        </div>
      </div>

      <div className="text-center font-poppins text-[34px] font-semibold mb-2 mt-6">
        About Us
      </div>

      <div className="sm:px-[180px] px-[50px] py-10 mb-12">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Pickup />
            </CarouselItem>
            <CarouselItem>
              <Dining />
            </CarouselItem>
            <CarouselItem>
              <CarDelivery />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <BlogSection />

      <div id="work-with-us">
        <WorkWithUs />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
