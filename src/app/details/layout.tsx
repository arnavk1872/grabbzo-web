import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        Sidebar
       <div className="bg-bgGray">{children}</div>
    </div>
  )
}

export default layout
