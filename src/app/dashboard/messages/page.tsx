import MessagesClient from "@/components/Messages/MessagesClient";

const Page = () => {
  return true ? (
    <div className="font-poppins flex items-center justify-center w-full h-screen text-[28px]">
      No Messages Yet!
    </div>
  ) : (
    <MessagesClient />
  );
};

export default Page;
