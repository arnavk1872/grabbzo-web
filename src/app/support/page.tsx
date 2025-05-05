import Header from '@/components/Dashboard/Header'
import GrabbzoChatBot from '@/components/support/ChatBot'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <h1 className="hidden">Support Page</h1>
      <GrabbzoChatBot/>
    </div>
  )
}

export default page
