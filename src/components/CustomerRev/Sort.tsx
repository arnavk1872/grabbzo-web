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
    <div className='bg-white w-full font-poppins rounded-[30px] h-[120px] border-borderColor border flex items-center justify-around mb-4'>
      {/* SORT */}
      <div className='flex font-poppins whitespace-nowrap items-center gap-x-2'>Sort By:
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              type="text"
              value={sortBy}
              readOnly
              placeholder="Select an option"
              className='cursor-pointer'
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
      <div className='flex whitespace-nowrap font-poppins items-center gap-x-2'>Filter By:
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              type="text"
              value={filterBy}
              readOnly
              placeholder="Select an option"
              className='cursor-pointer'
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

      <Button variant={'destructive'} className='text-[14px] font-bold text-white rounded-3xl px-12'>
        Search
      </Button>
    </div>
  )
}

export default Sort
