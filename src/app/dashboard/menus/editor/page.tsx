import MenuEditor from '@/components/menu/MenuEditor';
import { getAllCategories } from '@/helpers/menu-utils';
import React from 'react'

const page = async() => {

  const allCategories= await getAllCategories();
  return (
    <div className='flex overflow-x-hidden'>
      <MenuEditor allCategories={allCategories}/>
     
    </div>
  )
}

export default page
