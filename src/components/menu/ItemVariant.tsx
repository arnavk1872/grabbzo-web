import React, { useState } from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './MenuSheet';
import VariantGroupEditor from './VariantGroupEditor';

type VariantOption = {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  border?: boolean;
};

const variantOptions: VariantOption[] = [
  {
    title: 'Quantity',
    description: 'Quantity variations like - Small, medium, large, etc',
    icon: <span className="text-3xl">🍶</span>,
    bgColor: 'bg-teal-100',
    border: true,
  },
  {
    title: 'Preparation type',
    description: 'Item preparation style, eg - Halal, Non-Halal, etc',
    icon: <span className="text-3xl">🍳</span>,
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Size',
    description: 'Different sizes of an item, eg- bread size, pizza - 6", 12", etc',
    icon: <span className="text-3xl">🍟</span>,
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Base',
    description: 'Item Base types, eg - wheat bread, multi grain bread, etc',
    icon: <span className="text-3xl">🥖</span>,
    bgColor: 'bg-rose-100',
  },
  {
    title: 'Rice',
    description: "Choice of item's rice selection.",
    icon: <span className="text-3xl">🍚</span>,
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Make your own',
    description: 'Build your own addon group if you didn’t find one above',
    icon: <span className="text-3xl">➕</span>,
    bgColor: 'border border-dashed',
  },
];

const ItemVariant: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption | null>(null);
  const [open, setOpen] = useState(false);

  const handleVariantClick = (opt: VariantOption) => {
    setSelectedVariant(opt);
    setOpen(true);
  };

  return (
    <div className="space-y-4 font-poppins">
      {/* Title with tooltip */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-teal-800">What’s this</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <Info className="w-4 h-4 text-teal-700" />
              </span>
            </TooltipTrigger>

            <TooltipContent side="right" className="text-sm max-w-xs text-white">
              You can offer customisation options like quantity, extras, add-ons for customer.
              You can also define if customer selection of these options is optional or mandatory.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Option Grid */}
      <div className="grid grid-cols-2 gap-4 font-poppins">
        {variantOptions.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => handleVariantClick(opt)}
            className={`flex items-start gap-3 p-4 rounded-md cursor-pointer shadow-sm transition hover:shadow-md
              ${opt.bgColor} ${opt.border ? 'border-2 border-blue-400' : ''}`}
          >
            <div className="mt-1">{opt.icon}</div>
            <div>
              <h3 className="font-semibold">{opt.title}</h3>
              <p className="text-sm text-gray-700">{opt.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Sheet Modal */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {/* Invisible trigger to satisfy Sheet API */}
          <button type="button" className="hidden" aria-hidden="true" tabIndex={-1} />
        </SheetTrigger>
        <SheetContent className="w-1/2">
          <SheetHeader>
            <SheetTitle>Add {selectedVariant?.title}</SheetTitle>
          </SheetHeader>
          {selectedVariant && (
            <VariantGroupEditor
              title={selectedVariant.title}
              basePrice={20}
              onCancel={() => setOpen(false)}
              onSave={(data) => {
                console.log('Saved:', data);
                setOpen(false);
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ItemVariant;
