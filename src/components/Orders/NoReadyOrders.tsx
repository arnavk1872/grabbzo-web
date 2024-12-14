import React from 'react'
import Image from 'next/image'
import orderReady from "public/order-ready.png"

const NoReadyOrders = () => {
  return (
    <div>
       <Image src={orderReady} height={100} width={100} alt="No ready Orders"/>
    </div>
  )
}

export default NoReadyOrders
