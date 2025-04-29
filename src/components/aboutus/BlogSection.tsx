import { S3_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Why Smart Diners Are Switching to Pre-Order Takeaway in 2025",
      description:
        "Discover why pre-order takeaway is revolutionizing dining in 2025. Learn how it offers convenience, eco-friendly options, and better value for smart diners everywhere.",
      img: `${S3_BASE_URL}/public/blog1.png`,
      link: "",
    },
    {
      id: 2,
      title: "Why Grabbzo is Changing the Way You Dine Out",
      description:
        "Explore how Grabbzo is helping food lovers pre-order, skip queues, and enjoy seamless dine-in experiences across top restaurants.",
      isFeatured: true,
      img: `${S3_BASE_URL}/public/blog2.png`,
      link: "https://medium.com/@grabbzo11/grabbzo-the-smartest-way-to-pre-order-takeaway-and-dine-without-waiting-4fb7dfdb5d1a",
    },
    {
      id: 3,
      title: "Why pre-ordering your meal is the smartest move this year",
      description:
        "In a world where time is the real currency, waiting hours at a restaurant just to enjoy a meal feels ancient. Thanks to Grabbzo, smart foodies across India are skipping the chaos by pre-ordering their meals. ",
      img: `${S3_BASE_URL}/public/blog3.jpeg`,
      link: "",
    },
  ];

  return (
    <section className="pt-10 pb-24 px-4 md:px-28 font-poppins">
      <h2 className="text-2xl font-semibold mb-2">Our Blogs</h2>
      <p className="text-gray-600 mb-8">
        Get the latest updates, tips, and stories on how Grabbzo is transforming
        the dining experience—one table at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            href={blog.link}
            target="_blank"
            key={blog.id}
            className={`rounded-lg overflow-hidden shadow-sm bg-gray-100 cursor-pointer ${
              blog.isFeatured ? "md:col-span-1 md:row-span-2 md:scale-105" : ""
            }`}
          >
            <img src={blog.img} className="h-fit w-fit " />
            <div className="p-4">
              <h3 className="font-semibold text-[18px] break-words">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
