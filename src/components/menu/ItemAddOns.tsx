import React, { useState } from 'react';
import {
  Plus,
  Info,
  UtensilsCrossed,
  Pizza,
  LucideReceiptCent,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './MenuSheet'; // Ensure you have this from shadcn/ui
import AddOnGroupForm from './AddOnGroupForm';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/UI/Tooltip'; // ensure this import



type OptionType = 'Add-ons' | 'Extras' | 'Toppings' | 'Make your own';

interface ItemAddOn {
  type: OptionType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const options: ItemAddOn[] = [
  {
    type: 'Add-ons',
    title: 'Add-ons',
    description: 'Add-ons like Curd, Coke, Raita, etc',
    icon: <UtensilsCrossed className="w-6 h-6" />,
  },
  {
    type: 'Extras',
    title: 'Extras',
    description: 'Extra ingredients like cheese, tomato, mushroom, etc',
    icon: <LucideReceiptCent className="w-6 h-6" />,
  },
  {
    type: 'Toppings',
    title: 'Toppings',
    description: 'Sauces like Pesto, Mint Mayonnaise, Honey Mustard, etc',
    icon: <Pizza className="w-6 h-6" />,
  },
  {
    type: 'Make your own',
    title: 'Make your own',
    description: 'Build your own addon group if you didn’t find one above',
    icon: <Plus className="w-6 h-6" />,
  },
];

const ItemAddOns: React.FC = () => {
  const [selected, setSelected] = useState<OptionType>('Add-ons');
  const [openSheet, setOpenSheet] = useState(false);
  const [sheetContent, setSheetContent] = useState<ItemAddOn | null>(null);

  const handleOptionClick = (opt: ItemAddOn) => {
    setSelected(opt.type);
    setSheetContent(opt);
    setOpenSheet(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 font-poppins">
      <p className="text-sm text-gray-600">
        You can offer customisation options like topping, extras, addons for customers.
        <br />
        You can also define if customer selection of these options is optional or mandatory.
      </p>

      <TooltipProvider>
  <div className="flex items-center gap-2 text-teal-600 font-semibold">
    <span>What’s this</span>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer">
          <Info className="w-3 h-3" />
        </span>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-sm max-w-xs text-white bg-blue-700">
        You can offer customisation options like toppings, extras, and add-ons for your customers.
        You can also define whether selection is optional or mandatory.
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => {
          const isSelected = selected === opt.type;

          return (
            <div
              key={opt.type}
              className={`
                p-4 rounded-md cursor-pointer transition border
                ${opt.type === 'Make your own'
                  ? 'border-dashed border-gray-400 text-gray-700'
                  : isSelected
                  ? 'bg-teal-100 border-teal-300'
                  : 'bg-blue-100 border-transparent'}
              `}
              onClick={() => handleOptionClick(opt)}
            >
              <div className="flex items-center gap-2">
                <div className="text-black">{opt.icon}</div>
                <div>
                  <p className="font-semibold">{opt.title}</p>
                  <p className="text-xs text-gray-600">{opt.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sheetContent && (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent className='w-fit'>
          <SheetHeader className='text-xl font-semibold font-poppins'>Add {sheetContent.title}</SheetHeader>
              <AddOnGroupForm/>
            
            {/* Add form or additional logic here */}
            <div className="mt-4 text-sm text-gray-700">
              Configure options for <strong>{sheetContent.title}</strong> here.
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default ItemAddOns;
