
"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdCreditTop = () => {
    const router = useRouter();
  return (
    <div className='font-poppins px-12 pt-4'>
        <div className='flex items-center gap-x-3 mb-2'><ArrowLeft className='cursor-pointer' onClick={()=>{router.back()}}/>
        <p className='font-semibold text-[26px]'>Menu Vists ads</p></div>
    </div>
  )
}

export default AdCreditTop
