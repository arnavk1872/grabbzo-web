import AvailableMenu from '@/components/menu/AvailableMenu';
import MenuOverview from '@/components/menu/MenuOverview';
import { getCategories, inStock } from '@/helpers/api-utils';
import React from 'react';

const Page = async () => {
  const allCategories = await getCategories();
  // const checkStock =  await inStock("1");
 console.log(allCategories,"WHY")
 
  return (
    <div>
      {/* <AvailableMenu allCategories={allCategories} categories={undefined} setCategories={undefined} categoryCount={undefined} />
       */}
      <MenuOverview allCategories={allCategories}/>
    </div>
  );
};

export default Page;