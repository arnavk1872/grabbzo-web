import NoNewOrders from '@/components/Orders/NoNewOrders'
import OrderTable from '@/components/Orders/OrderTable'
import { getOrders } from '@/helpers/api-utils'
import React from 'react'

const page = async() => {


    const orderDetails =await getOrders("new");
    console.log(orderDetails,"NEW ORDERS");
    


  return (
    <div className='w-full'>
      <OrderTable />
      <NoNewOrders/>
    </div>
  )
}

export default page
