import MenuEditor from '@/components/menu/MenuEditor';
import { getCategories } from '@/helpers/api-utils';
import React from 'react'

const page = async() => {

  const allCategories= await getCategories();
  return (
    <div className='flex overflow-x-hidden'>
      <MenuEditor allCategories={allCategories}/>
     
    </div>
  )
}

export default page
