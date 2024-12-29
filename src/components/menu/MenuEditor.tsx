"use client";
import React, { useState } from 'react';
import AvailableMenu from './AvailableMenu';
import ChangeMenu from './ChangeMenu';

interface MenuEditorProps {
  allCategories: {
    id: number;
    name: string;
    items: { id: number; title: string; isStock: boolean }[];
  }[];
}

const MenuEditor: React.FC<MenuEditorProps> = ({ allCategories }) => {
  const [toggleEditor, changeToggleEditor] = useState(true);

  return (
    <>
<AvailableMenu allCategories={allCategories as any} changeToggleEditor={changeToggleEditor} />
<ChangeMenu toggleEditor={toggleEditor} allCategories={allCategories as any} />

    </>
  );
};

export default MenuEditor;
