import React from 'react'
import Image from 'next/image';
import { S3_BASE_URL } from '@/lib/constants';

const NoPickedOrders = () => {
  return (
    <div>
       <div className='flex flex-col items-center justify-center h-[500px]'>
       <Image src={`${S3_BASE_URL}/public/order-done.png`} height={220} width={220} alt="No picked Orders"/>
  
    </div>
    </div>
  )
}

export default NoPickedOrders
