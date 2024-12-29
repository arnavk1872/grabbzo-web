import React from 'react'
import Image from 'next/image';
import orderPicked from 'public/order-done.png'

const NoPickedOrders = () => {
  return (
    <div>
      
       <div className='flex flex-col items-center justify-center h-[500px]'>
       <Image src={orderPicked} height={220} width={220} alt="No picked Orders"/>
  
    </div>
    </div>
  )
}

export default NoPickedOrders
