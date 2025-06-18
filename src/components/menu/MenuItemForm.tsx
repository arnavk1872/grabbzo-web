import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import { formSchema } from "./formSchema";
import { useItemStore } from "@/store/MenuStore";
import { useSnackbar } from "notistack";
import BasicItemDetails from './BasicItemDetails';
import ItemPricingDetails from './ItemPricingDetails';
import ItemVariant from './ItemVariant';
import ItemAddOns from './ItemAddOns';
import ImageSelector from './ImageSelector';

interface MenuItemFormProps {
  categories: Record<string, { 
    isDisabled: boolean; 
    categoryId: number; 
    items: any[];
    subCategories?: { id: number; name: string; items: any[] }[];
  }>;
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const MenuItemForm = forwardRef<
  { getItemData: () => void },
  MenuItemFormProps
>(({ categories, formData, onFormDataChange }, ref) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { selectedItem, setSelectedItem, itemId, categoryValue, categoryId, accordionValue, setAccordionValue } = useItemStore();

  const prevCategoryIdRef = useRef<number | null>(null);

  const savedItem = selectedItem?.data;

  // Ensure categoryId is saved to formData when it changes
  useEffect(() => {
    if (categoryId && categoryId !== prevCategoryIdRef.current) {
      onFormDataChange("categoryId", categoryId);
      prevCategoryIdRef.current = categoryId;
    }
  }, [categoryId]);

  // Update IDs when categoryValue changes
  useEffect(() => {
    if (categoryValue?.includes('/')) {
      const [categoryName, subcategoryName] = categoryValue.split('/');
      const category = categories[categoryName];
      if (category?.subCategories) {
        const subcategory = category.subCategories.find(sub => sub.name === subcategoryName);
        if (subcategory) {
          // When subcategory is selected, only send subcategoryId
          onFormDataChange("subcategoryId", subcategory.id);
          onFormDataChange("categoryId", null);
        }
      }
    } else {
      // When only category is selected, only send categoryId
      onFormDataChange("categoryId", categoryId);
      onFormDataChange("subcategoryId", null);
    }
  }, [categoryValue, categories, categoryId]);

  //Loads up the current item details
  useEffect(() => {
    if (!savedItem) return;
    const updatedFormData = {
      title: savedItem.title,
      description: savedItem.description,
      price: savedItem.price,
      selectedCategory: categoryValue,
      isVeg: savedItem.isVeg,
      id: savedItem.id,
      preparationTime: savedItem.preparationTime,
      servingInfo: savedItem.servingInfo,
      portionSize: savedItem.portionSize,
      restaurantCategory: { id: 1 },
      // Only set one ID based on whether it's a category or subcategory
      ...(categoryValue?.includes('/') 
        ? { subcategoryId: savedItem.subcategoryId, categoryId: null }
        : { categoryId: savedItem.categoryId, subcategoryId: null }
      )
    };
    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (formData[key] !== value) {
        onFormDataChange(key, value);
      }
    });
  }, [savedItem, categoryValue, categoryId]);

  //update/add Item
  useEffect(() => {
    if (selectedItem) {
      // Update the selectedItem object entirely
      setSelectedItem({
        title: formData.title,
        id: formData.id,
        description: formData.description,
        price: formData.price,
        selectedCategory: categoryValue,
        isVeg: formData.isVeg,
        isStock: true,
        restaurantCategory: { id: 1 },
        portionSize: formData.portionSize,
        servingInfo: formData.servingInfo,
        preparationTime: formData.preparationTime,
        categoryId: categoryId,
      });
    }
  }, [formData.title, formData.id, formData.description, formData.price, formData.isVeg, formData.portionSize, formData.servingInfo, formData.preparationTime, categoryValue, categoryId, selectedItem, setSelectedItem]);

  //For validations
  useImperativeHandle(ref, () => ({
    getItemData: () => {
      const validationResult = formSchema.safeParse(formData);
      if (!validationResult.success) {
        console.error("Validation Errors:", validationResult.error.errors);
        const validationErrors: Record<string, string> = {};
        validationResult.error.errors.forEach((err) => {
          const path = err.path.join(".");
          validationErrors[path] = err.message;
        });
        setErrors(validationErrors);
        
        // Auto-open accordion based on error type
        const errorFields = Object.keys(validationErrors);

        
        const hasPriceError = errorFields.includes('price');
        const hasUserBasicDetailErrors = errorFields.some(field => 
          ['title', 'description'].includes(field)
        );
      
        
        if (hasUserBasicDetailErrors) {
          setAccordionValue('section-0');
        } else if (hasPriceError) {

          setAccordionValue('section-1'); 
        } else {
          setAccordionValue('section-0'); 
        }
        
        return validationErrors; 
      }
      return {}; // Return empty object if no errors
    },
  }));


  const accordionSections = [
    {
      title: 'Basic Item Details',
      content: <BasicItemDetails
        formData={formData}
        onFormDataChange={onFormDataChange}
        errors={errors}
        setErrors={setErrors}
      />,
    },

    {
      title: 'Item Pricing',
      content: <ItemPricingDetails
        formData={formData}
        onFormDataChange={onFormDataChange}
        errors={errors}
        setErrors={setErrors}
      />,
    },
    {
      title: 'Item Image',
      content: <ImageSelector />,
    },
    {
      title: 'Variants of this Item',
      content: <ItemVariant onAccordionOpen={() => {
        if (accordionValue === 'section-3') {
          return true;
        }
        return false;
      }} />,
    },
    {
      title: 'Add-on groups for this Item',
      content: <ItemAddOns />,
    },
  ];

  const compulsary = [ "Variants of this Item", "Add-on groups for this Item"];

  return (
    <form className="space-y-6 p-4  mx-auto font-poppins">
      <Accordion 
        type="single" 
        collapsible 
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        {accordionSections.map(({ title, content }, index) => (
          <AccordionItem key={index} value={`section-${index}`}>
            <AccordionTrigger className="text-lg text-black font-semibold w-[490px]">
              {title} {compulsary.includes(title) ? "" : <span className="text-red-500">*</span>}
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium text-black">
              {content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </form>
  );
});

MenuItemForm.displayName = "MenuItemForm";

export default MenuItemForm;
