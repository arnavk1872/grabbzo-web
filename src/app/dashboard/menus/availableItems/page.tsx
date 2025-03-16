import MenuOverview from "@/components/menu/MenuOverview";
import { getCategories } from "@/helpers/api-utils";
import React from "react";

const Page = async () => {
  const allCategories = await getCategories();

  return (
    <div>
      <MenuOverview allCategories={allCategories} />
    </div>
  );
};

export default Page;
