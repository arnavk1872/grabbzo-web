import NoReadyOrders from '@/components/Orders/NoReadyOrders'
import OrderTable from '@/components/Orders/OrderTable'
import React from 'react'

const page = () => {
  return (
    <div>
      <OrderTable/>
      <NoReadyOrders/>
    </div>
  )
}

export default page
