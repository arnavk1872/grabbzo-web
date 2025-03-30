import Laptop from "../Icons/Laptop";
import Mic from "../Icons/Mic";
import Parcel from "../Icons/Parcel";
import People from "../Icons/People";

interface faqDataProp {
  value: string;
  question: string;
  answer: string;
}

interface DocumentsProps {
  name: string;
}

interface CardProps {
  icon: React.FC<any>;
  title: string;
  desc: string;
}

export const faqData: faqDataProp[] = [
  {
    value: "item-1",
    question: "How do I register my restaurant on Grabbzo?",
    answer:
      "We’ll guide you through an easy sign-up process where you’ll need to provide restaurant details, menu, pricing, and other necessary info.",
  },
  {
    value: "item-2",
    question: "What are the costs involved in joining Grabbzo?",
    answer: "Grabbzo charges a small subscription fee.",
  },
  {
    value: "item-3",
    question: "How do I manage orders through the app?",
    answer:
      "Our restaurant app has a user-friendly interface that allows you to accept, reject, and track orders in real time. You can also manage your menu and pricing.",
  },
  {
    value: "item-4",
    question: "Can I update my menu and prices on Grabbzo?",
    answer:
      "Yes, you can easily update your menu items, prices, and availability directly through the app.",
  },
  {
    value: "item-5",
    question:
      "How do I manage customer orders for takeaway, pre-dine-in, and car delivery?",
    answer:
      "You’ll be able to select specific order types (takeaway, pre-dine-in, or car delivery) and manage them individually based on your preferences.",
  },
  {
    value: "item-6",
    question: "How do I handle customer complaints or feedback?",
    answer:
      "You can view customer ratings and reviews in real time. If there's an issue, you can respond directly to customers through the app to offer solutions or compensation.",
  },
  {
    value: "item-7",
    question: "How are payments handled?",
    answer:
      "Grabbzo handles all transactions through secure payment gateways. You’ll receive regular payouts for your orders, typically on a weekly basis.",
  },
  {
    value: "item-8",
    question: "How do I track the performance of my restaurant on Grabbzo?",
    answer:
      "We provide an analytics dashboard where you can track order volume, customer preferences, and other key metrics to help you optimize your restaurant’s performance.",
  },
];

export const Documents: DocumentsProps[] = [
  {
    name: "PAN Card",
  },
  {
    name: "Menu Image",
  },
  {
    name: "Bank Account Details",
  },
  {
    name: "GST Number",
  },
  {
    name: "FSSAI Licence",
  },
];

export const Cards: CardProps[] = [
  {
    icon: People,
    title: "Pre-dine in, Takeaway & Car Delivery",
    desc: "Smart ordering for Smart Restaurants",
  },
  {
    icon: Parcel,
    title: "Zero Commission charges Per Order",
    desc: "Boost Orders, Cut Cost-Join Grabbzo!",
  },
  {
    icon: Mic,
    title: "Increased Table Rotation",
    desc: "Boost your revenue by minimal waiting period",
  },
  {
    icon: Laptop,
    title: "Easy Restaurant Dasboard",
    desc: "Smoother Operations and Happier Customers!",
  },
];

export const numbers = [
  "1122334455",
  "1112223339",
  "9595959595",
  "8585858585",
  "7575757575",
];
