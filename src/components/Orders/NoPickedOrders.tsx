import React from 'react'
import Image from 'next/image';
import orderPicked from 'public/order-done.png'

const NoPickedOrders = () => {
  return (
    <div>
       <Image src={orderPicked} height={100} width={100} alt="No picked Orders"/>
    </div>
  )
}

export default NoPickedOrders
