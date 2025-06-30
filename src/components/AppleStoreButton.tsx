"use client";

import Image from "next/image";
import { useSnackbar } from "notistack";
import { S3_BASE_URL } from "@/lib/constants";

const AppleStoreButton = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("Coming to iOS soon!", {
      variant: "info",
      className: "font-poppins",
    });
  };

  return (
    <button 
      className="cursor-pointer " 
      onClick={handleClick}
      type="button"
    >
      <Image
        src={`${S3_BASE_URL}/public/app_store.png`}
        height={145}
        width={145}
        alt="Grabbzo logo"
      />
    </button>
  );
};

export default AppleStoreButton; 