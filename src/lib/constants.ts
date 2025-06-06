export const S3_BASE_URL = "https://publicimgbucket.s3.us-east-1.amazonaws.com";


export const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Grabbzo",
  "url": "https://www.grabbzo.com",
  "description": "Grabbzo is a smart dining platform that lets you pre-order meals or dine in at your favorite restaurants without the wait. Discover menus, book tables, and enjoy a seamless food experience with just a few taps.",
  "logo": "https://publicimgbucket.s3.us-east-1.amazonaws.com/public/Grabbzo-main-logo.png",
  "sameAs": [
    "https://www.instagram.com/grabbzo?igsh=YW5heDZtbDIxcTIz",
    "https://x.com/Grabbzo125105?t=y8hXBAIiY2zzZ-JxaMBAEg&s=09",
    "https://www.linkedin.com/company/grabbzo/"
  ]
};


export const partners = [
  { name: 'ns-restaurant', logo: `${S3_BASE_URL}/public/ns-restaurant.png` },
  { name: 'cafe', logo: `${S3_BASE_URL}/public/cafe.jpg` },
  { name: 'Cafe2', logo: `${S3_BASE_URL}/public/cafe2.png` },
  { name: 'Espato', logo: `${S3_BASE_URL}/public/espato.png` },
  { name: 'Punjabi Brothers', logo: `${S3_BASE_URL}/public/punjabi-brothers.png` },
  { name: 'Dumpling Hood', logo: `${S3_BASE_URL}/public/dumpling-hood.png` },
  { name: 'Dosas & More', logo: `${S3_BASE_URL}/public/dosas-more.png` },
  { name: 'Kasturi Nikka', logo: `${S3_BASE_URL}/public/kasturi-nikka.png` },
  { name: 'Amritsari Kulcha Hut', logo: `${S3_BASE_URL}/public/akulchahut.png` },
];
