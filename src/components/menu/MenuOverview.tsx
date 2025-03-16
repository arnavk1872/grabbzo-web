"use client";

import React, { useEffect, useMemo, useState } from "react";
import AvailableMenu from "./AvailableMenu";

interface MenuOverViewProps {
  allCategories: {
    isDisabled: boolean;
    categoryId: number;
    id: number;
    name: string;
    items: {
      title: any;
      isStock: any;
      id: number;
      name: string;
      isEnabled: boolean;
    }[];
  }[];
}

type Item = {
  id: number;
  title: string; // Transformed from `name`
  isEnabled: boolean;
};

const MenuOverview = ({ allCategories }: MenuOverViewProps) => {
  const [toggleEditor, changeToggleEditor] = useState(true);
  const [localItems, setLocalItems] = useState(null);
  const [categories, setCategories] = useState<
    Record<string, { isDisabled: boolean; categoryId: number; items: Item[] }>
  >({});

  useEffect(() => {
    const categoryData = allCategories.reduce<
      Record<string, { isDisabled: boolean; categoryId: number; items: Item[] }>
    >((acc, category) => {
      acc[category.name] = {
        isDisabled: category.isDisabled,
        categoryId: category.id,
        items: category.items.map((item) => ({
          id: item.id,
          title: item.name,
          isEnabled: item.isStock,
        })),
      };
      return acc;
    }, {});

    setCategories(categoryData);
  }, [allCategories]);

  const categoryCount = useMemo(
    () => Object.keys(categories).length,
    [categories]
  );

  return (
    <div>
      <AvailableMenu
        allCategories={allCategories}
        changeToggleEditor={changeToggleEditor}
        categories={categories}
        setCategories={setCategories}
        categoryCount={categoryCount}
        localItems={localItems}
        setLocalItems={setLocalItems}
      />
    </div>
  );
};

export default MenuOverview;
