// lib/blogs.ts
import blogContent1 from "../helpers/blogContent/blogContent1";
import blogContent2 from "../helpers/blogContent/blogContent2";
import { S3_BASE_URL } from "./constants";

export const blogs = [
  {
    id: 1,
    slug: "smart-diners-preorder-2025",
    title: "Why Smart Diners Are Switching to Pre-Order Takeaway in 2025",
    description:
      "Discover why pre-order takeaway is revolutionizing dining in 2025. Learn how it offers convenience, eco-friendly options, and better value for smart diners everywhere.",
    img: `${S3_BASE_URL}/public/blog1.png`,
    content: blogContent1,
  },
  {
    id: 2,
    title: "Why Grabbzo is Changing the Way You Dine Out",
    description:
      "Explore how Grabbzo is helping food lovers pre-order, skip queues, and enjoy seamless dine-in experiences across top restaurants.",
    isFeatured: true,
    img: `${S3_BASE_URL}/public/blog2.png`,
    externalLink:
      "https://medium.com/@grabbzo11/grabbzo-the-smartest-way-to-pre-order-takeaway-and-dine-without-waiting-4fb7dfdb5d1a",
  },
  {
    id: 3,
    slug: "preorder-meals-smartest-move",
    title: "Why pre-ordering your meal is the smartest move this year ?",
    description:
      "In a world where time is the real currency, waiting hours at a restaurant just to enjoy a meal feels ancient. Thanks to Grabbzo, smart foodies across India are skipping the chaos by pre-ordering their meals.",
    img: `${S3_BASE_URL}/public/blog3.jpeg`,
    content: blogContent2
  },
];
