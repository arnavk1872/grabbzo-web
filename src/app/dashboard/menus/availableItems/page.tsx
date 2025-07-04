import MenuOverview from "@/components/menu/MenuOverview";
import { getAllCategories } from "@/helpers/menu-utils";
import React from "react";

const Page = async () => {
  const allCategories = await getAllCategories();

  return (
    <div>
      <MenuOverview allCategories={allCategories} />
    </div>
  );
};

export default Page;
