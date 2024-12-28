import React from 'react'
import storeClosed from '@public/store-closed.png'
import Image from 'next/image'

const NoNewOrders = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[500px]'>
      <Image src={storeClosed} height={1200} width={200} alt="No new Orders"/>
      <div className='font-poppins'>No New orders yet!</div>
    </div>
  )
}

export default NoNewOrders
