import AvailableMenu from '@/components/menu/AvailableMenu'
import ChangeMenu from '@/components/menu/ChangeMenu'
import MenuEditor from '@/components/menu/MenuEditor';
import { getCategories } from '@/helpers/api-utils';
import React from 'react'

const page = async() => {

  const allCategories= await getCategories();
  return (
    <div className='flex'>
      <MenuEditor allCategories={allCategories}/>
     
    </div>
  )
}

export default page
