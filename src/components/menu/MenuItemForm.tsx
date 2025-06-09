
import React from 'react';
import { Button } from '@/components/UI/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';

import BasicItemDetails from './BasicItemDetails';
import ItemPricingDetails from './ItemPricingDetails';
import ItemVariant from './ItemVariant';
import ItemAddOns from './ItemAddOns';
import ImageSelector from './ImageSelector';
import ItemTimings from './ItemTimings';

const accordionSections = [
  {
    title: 'Basic Item Details',
    content: <BasicItemDetails />,
  },
  {
    title: 'Item Pricing',
    content: <ItemPricingDetails />,
  },
  {
    title: 'Variants of this Item',
    content: <ItemVariant />,
  },
  {
    title: 'Add-on groups for this Item',
    content: <ItemAddOns />,
  },
  {
    title: 'Item Image',
    content: <ImageSelector />,
  },
  {
    title: 'Item Timings',
    content: <ItemTimings />,
  },
];

const MenuItemForm = () => {
  return (
    <form className="space-y-6 p-4 max-w-3xl mx-auto font-poppins">
      {accordionSections.map(({ title, content }, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={`section-${index}`}>
            <AccordionTrigger className="text-lg text-black font-semibold">
              {title}
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium text-black">
              {content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-between space-x-2">
        <Button variant="destructive">Delete Item</Button>
        <div className="space-x-2 flex">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="text-white">
            Create Variant Group
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
