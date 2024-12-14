import React from 'react'
import storeClosed from '@public/store-closed.png'
import Image from 'next/image'

const NoNewOrders = () => {
  return (
    <div>
      <Image src={storeClosed} height={100} width={100} alt="No new Orders"/>
    </div>
  )
}

export default NoNewOrders
