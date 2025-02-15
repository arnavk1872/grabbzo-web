/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "publicimgbucket.s3.us-east-1.amazonaws.com",
          pathname: "/public/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  