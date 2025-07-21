"use client"
import React, { useState } from 'react'
import { Input } from '../UI/Input'
import { Button } from '../UI/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../UI/Dropdown'

const Sort: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("")
  const [filterBy, setFilterBy] = useState<string>("")

  const menuOptions: string[] = ["All reviews", "Last 30 days", "Last 60 days", "Last 90 days"]
  const sortOptions: string[] = ["Newest", "Oldest"]

  return (
    <div className='bg-white w-full font-poppins rounded-[30px] h-auto sm:h-[120px] border-borderColor border flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4 sm:gap-0 p-4 sm:p-0 mb-4'>
      {/* SORT */}
      <div className='flex font-poppins whitespace-nowrap items-center gap-x-2 flex-col sm:flex-row w-full sm:w-auto'>
      <div className='max-md:my-2'>Sort By:</div>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-full sm:w-auto'>
            <Input
              type="text"
              value={sortBy}
              readOnly
              placeholder="Select an option"
              className='cursor-pointer w-3/4 md:w-auto'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => setSortBy(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* FILTER */}
      <div className='flex font-poppins whitespace-nowrap items-center gap-x-2 flex-col sm:flex-row w-full sm:w-auto'>
        <div className='max-md:my-2'>Filter By:</div>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-full sm:w-auto'>
            <Input
              type="text"
              value={filterBy}
              readOnly
              placeholder="Select an option"
              className='cursor-pointer w-3/4 md:w-auto'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {menuOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => setFilterBy(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button
        variant={'destructive'}
        className='text-[14px] font-bold text-white rounded-3xl px-12 w-full sm:w-auto'
      >
        Search
      </Button>
    </div>
  )
}

export default Sort
