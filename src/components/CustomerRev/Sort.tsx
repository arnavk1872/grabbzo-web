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

  const [selectedItem, setSelectedItem] = useState<string>("");
  const menuOptions: string[] = ["All reviews", "Last 30 days", "Last 60 days", "Last 90 days"];
  const handleSelect = (item: string): void => setSelectedItem(item);

  return (
    <div className='bg-white w-full  font-poppins rounded-[30px] h-[120px] border-borderColor  border flex items-center justify-around mb-4'>
      <div className='flex font-poppins whitespace-nowrap items-center gap-x-2'>Sort By: <Input /></div>
      <div className='flex whitespace-nowrap font-poppins items-center gap-x-2'>Filter By:
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              type="text"
              value={selectedItem}
              readOnly
              placeholder="Select an option"
              className='cursor-pointer'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {menuOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => handleSelect(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button variant={'destructive'} className='text-[14px] font-bold text-white rounded-3xl px-12'>Search</Button>
    </div>
  );
}

export default Sort;
