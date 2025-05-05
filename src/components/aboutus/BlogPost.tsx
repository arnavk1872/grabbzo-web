
"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import { blogs } from "@/lib/blogs";


interface Blog {
  slug: string;
  title: string;
  content: string;
}

const BlogPost: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null); 
  const pathname = usePathname(); 

  useEffect(() => {
    const slug = pathname?.split("/").pop(); 

    if (slug) {
        const foundBlog = blogs.find((b) => (b as Blog).slug === slug) as Blog;
        setBlog(foundBlog ?? null);
    }
  }, [pathname]); 

  if (!pathname) return <p className="text-center py-10">Loading...</p>;

  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  return (
    <article className="max-w-[85%] text-justify mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-2 font-poppins">{blog.title}</h1> */}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default BlogPost;
