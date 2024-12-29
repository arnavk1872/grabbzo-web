import CustomerDetails from '@/components/Orders/CustomerDetails'
import ItemsOrdered from '@/components/Orders/ItemsOrdered'
import OrderDetails from '@/components/Orders/OrderDetails'
import React from 'react'

const page = () => {
  return (
      <div className='w-full' ><OrderDetails />
      <div className='flex w-full justify-between items-start'><CustomerDetails /><ItemsOrdered/></div>
      
      </div>
  )
}

export default page
