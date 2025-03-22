import React from 'react'
import Image from 'next/image'
import { S3_BASE_URL } from '@/lib/constants'

const NoNewOrders = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[500px]'>
      <Image src={`${S3_BASE_URL}/public/store-closed.png`} height={1200} width={200} alt="No new Orders"/>
      <div className='font-poppins'>No New orders yet!</div>
    </div>
  )
}

export default NoNewOrders
