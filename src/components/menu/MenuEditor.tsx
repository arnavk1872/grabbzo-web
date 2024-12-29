"use client";
import React, { useState } from 'react';
import AvailableMenu from './AvailableMenu';
import ChangeMenu from './ChangeMenu';

interface MenuEditorProps {
  allCategories: {
    id: number;
    name: string;
    items: { id: number; name: string; isEnabled: boolean }[];
  }[];
}

const MenuEditor: React.FC<MenuEditorProps> = ({ allCategories }) => {
  const [toggleEditor, changeToggleEditor] = useState(true);

  return (
    <>
      <AvailableMenu allCategories={allCategories} changeToggleEditor={changeToggleEditor} />
      <ChangeMenu toggleEditor={toggleEditor} allCategories={allCategories} />
    </>
  );
};

export default MenuEditor;
