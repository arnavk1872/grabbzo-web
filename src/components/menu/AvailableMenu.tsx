"use client";
import React, { useState } from 'react';
import AvailableCategories from './AvailableCategories';
import AvailableItems from './AvailableItems';

type Category = {
  id: number;
  name: string;
  items: { id: number; name: string; isEnabled: boolean }[];
};

type Item = {
  id: number;
  title: string; // Transformed from `name`
  isEnabled: boolean;
};


interface AvailableMenuProps {
  allCategories: {
    id: number;
    name: string;
    items: { id: number; name: string; isEnabled: boolean }[];
  }[];
  changeToggleEditor?: (toggle: boolean) => void; // Adjusted type
}


const AvailableMenu: React.FC<AvailableMenuProps> = ({ allCategories, changeToggleEditor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(allCategories[0]?.name || '');

  const categoryData = allCategories.reduce<Record<string, Item[]>>(
    (acc, category) => {
      acc[category.name] = category.items.map(item => ({
        id: item.id,
        title: item.name, // Map `name` to `title`
        isEnabled: item.isEnabled,
      }));
      return acc;
    },
    {}
  );
  

  // Provide a default implementation if changeToggleEditor is undefined
  const handleToggleEditor = changeToggleEditor || (() => {});

  return (
    <div className="p-4 flex gap-x-4 w-full">
      <AvailableCategories
        categories={Object.keys(categoryData)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        changeToggleEditor={handleToggleEditor} // Use the ensured function
      />
      <AvailableItems
        items={categoryData[selectedCategory]}
        changeToggleEditor={handleToggleEditor} // Use the ensured function
      />
    </div>
  );
};


export default AvailableMenu;
