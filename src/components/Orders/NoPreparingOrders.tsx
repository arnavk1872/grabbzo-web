import React from 'react'
import Image from 'next/image'
import preparing from "public/preparing.png"

const NoPreparingOrders = () => {
  return (
    <div>
       <Image src={preparing} height={100} width={100} alt="No preparing Orders"/>
    </div>
  )
}

export default NoPreparingOrders
