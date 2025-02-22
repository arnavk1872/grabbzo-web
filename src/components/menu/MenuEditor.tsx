"use client";
import React, { useMemo, useState } from "react";
import AvailableMenu from "./AvailableMenu";
import ChangeMenu from "./ChangeMenu";

interface MenuEditorProps {
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

type LocalItem = {
  isDisabled: boolean;
  categoryId: number;
  items: Item[];
};





const MenuEditor: React.FC<MenuEditorProps> = ({ allCategories }) => {
  const [toggleEditor, changeToggleEditor] = useState(true);
  const [localItems, setLocalItems] = useState<LocalItem[]>([]);

   

      const categoryData = useMemo(() => {
        return allCategories.reduce<
          Record<string, { isDisabled: boolean; categoryId: number; items: Item[] }>
        >((acc, category) => {
          acc[category.name] = {
            isDisabled: category.isDisabled,
            categoryId: category.id,
            items: category.items.map((item) => ({
              id: item.id,
              title: item.title, 
              isEnabled: item.isStock,
            })),
          };
          return acc;
        }, {});
      }, [JSON.stringify(allCategories)]);

      const [categories, setCategories] = useState(categoryData);
    
        const categoryCount = useMemo(
          () => Object.keys(categoryData).length,
          [categoryData]
        );

  return (
    <>
      <AvailableMenu
        allCategories={allCategories as any}
        changeToggleEditor={changeToggleEditor}
        categories={categories}
        setCategories={setCategories}
        categoryCount={categoryCount}
        localItems={localItems}
        setLocalItems={setLocalItems}
      />
      <ChangeMenu
        toggleEditor={toggleEditor}
        allCategories={allCategories as any}
        categories={categories}
        setCategories={setCategories}
        localItems={localItems}
        setLocalItems={setLocalItems}
      />
    </>
  );
};

export default MenuEditor;
