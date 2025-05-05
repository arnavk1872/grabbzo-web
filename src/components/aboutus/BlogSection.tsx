"use client"

import Link from "next/link";
import React from "react";
import { blogs } from "@/lib/blogs";

const BlogSection = () => {
  return (
    <section className="pt-10 pb-28 px-4 md:px-28 font-poppins">
      <h2 className="text-2xl font-semibold mb-2">Our Blogs</h2>
      <p className="text-gray-600 mb-8">
        Get the latest updates, tips, and stories on how Grabbzo is transforming
        the dining experience—one table at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => {
          const isExternal = !!blog.externalLink;
          const href = isExternal ? blog.externalLink : `about/${blog.slug}`;

          return (
            <Link
              href={href}
              target={isExternal ? "_blank" : "_self"}
              key={blog.id}
              className={`rounded-lg overflow-hidden shadow-sm bg-gray-100 hover:bg-gray-300 cursor-pointer ${
                blog.isFeatured ? "md:col-span-1 md:row-span-2 md:scale-105" : ""
              }`}
            >
              <img src={blog.img} alt={blog.title} className="h-fit w-fit" />
              <div className="p-4">
                <h3 className="font-semibold text-[18px] break-words">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {blog.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;
