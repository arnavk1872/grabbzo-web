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
    subCategories?: Array<{
      id: number;
      name: string;
      items: {
        title: any;
        isStock: any;
        id: number;
        name: string;
        isEnabled: boolean;
      }[];
    }>;
  }[];
}

type Item = {
  id: number;
  title: string;
  isEnabled: boolean;
};

type CategoryData = {
  isDisabled: boolean;
  categoryId: number;
  items: Item[];
  subCategories?: Array<{
    id: number;
    name: string;
    items: Item[];
  }>;
};

const MenuOverview = ({ allCategories }: MenuOverViewProps) => {
  const [toggleEditor, changeToggleEditor] = useState(true);
  const [localItems, setLocalItems] = useState<CategoryData[]>([]);

  const categoryData = useMemo(() => {
    const transformedData: Record<string, CategoryData> = {};
    
    allCategories.forEach(category => {
      const transformedCategory: CategoryData = {
        isDisabled: category.isDisabled,
        categoryId: category.id,
        items: category.items.map(item => ({
          id: item.id,
          title: item.title,
          isEnabled: !!item.isStock,
        }))
      };

      if (category.subCategories && category.subCategories.length > 0) {
        transformedCategory.subCategories = category.subCategories.map(subcat => ({
          id: subcat.id,
          name: subcat.name,
          items: subcat.items.map(item => ({
            id: item.id,
            title: item.title,
            isEnabled: !!item.isStock,
          }))
        }));
      }

      transformedData[category.name] = transformedCategory;
    });

    return transformedData;
  }, [allCategories]);

  const [categories, setCategories] = useState(categoryData);

  const categoryCount = useMemo(
    () => Object.keys(categoryData).length,
    [categoryData]
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
