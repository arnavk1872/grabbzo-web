import AvailableMenu from '@/components/menu/AvailableMenu';
import { getCategories, inStock } from '@/helpers/api-utils';
import React from 'react';

const Page = async () => {
  const allCategories = await getCategories();
  // const checkStock =  await inStock("1");

  return (
    <div>
      <AvailableMenu allCategories={allCategories} />
    </div>
  );
};

export default Page;