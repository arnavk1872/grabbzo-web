import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='font-poppins ml-10 min-w-[800px]'>
      <div className='flex justify-between mb-1'>
        <h1 className='font-semibold text-4xl'>Restaurant information</h1>
        <Image
          src="/Restaruant-Information.png"
          width={114}
          height={73}
          alt="logo"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className='bg-white rounded-3xl border border-black border-opacity-25 shadow-md px-5 py-8 flex flex-col gap-8'>
        <Input placeholder="Owner Full Name*"/>
        <Input placeholder="Restaurant Name*"/>
        <Input placeholder="Email Address"/>
        <Input placeholder="Mobile Number*"/>
        <div>
          <h6>Restaurant's primary contact number</h6>
          <span>Customers and Grabbzo may call on this number for order support</span>

        </div>
        <Button>Proceed</Button>
      </div>
    </div>
  )
}

export default page
