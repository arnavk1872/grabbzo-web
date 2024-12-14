import NoPickedOrders from '@/components/Orders/NoPickedOrders'
import OrderTable from '@/components/Orders/OrderTable'
import { getOrders } from '@/helpers/api-utils';
import React from 'react'

const page = async() => {

      const orderDetails =await getOrders("done");
      console.log(orderDetails,"COMPLETED ORDERS");
      
      
  return (
    <div>
      <OrderTable/>
      <NoPickedOrders/>
    </div>
  )
}

export default page
