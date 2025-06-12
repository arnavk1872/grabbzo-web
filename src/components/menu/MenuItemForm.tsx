import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Button } from '@/components/UI/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import { Input } from "../UI/Input";
import Dropdown from "./DropDown";
import { Textarea } from "../UI/TextArea";
import { formSchema } from "./formSchema";
import { useItemStore } from "@/store/MenuStore";
import { X } from "lucide-react";
import { addItemImage } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";

import BasicItemDetails from './BasicItemDetails';
import ItemPricingDetails from './ItemPricingDetails';
import ItemVariant from './ItemVariant';
import ItemAddOns from './ItemAddOns';
import ImageSelector from './ImageSelector';

interface MenuItemFormProps {
  categories: Record<string, { isDisabled: boolean; categoryId: number; items: any[] }>;
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const MenuItemForm = forwardRef(
  ({ categories, formData, onFormDataChange }: MenuItemFormProps, ref) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { selectedItem, setSelectedItem, itemId, categoryValue, categoryId } =
      useItemStore();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const prevCategoryIdRef = useRef<number | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const savedItem = selectedItem?.data;

    // Ensure categoryId is saved to formData when it changes
    useEffect(() => {
      if (categoryId && categoryId !== prevCategoryIdRef.current) {
        onFormDataChange("categoryId", categoryId);
        prevCategoryIdRef.current = categoryId;
      }
    }, [categoryId]);

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
        categoryId: categoryId,
      };
      Object.entries(updatedFormData).forEach(([key, value]) => {
        if (formData[key] !== value) {
          onFormDataChange(key, value);
        }
      });

      setImagePreview(savedItem.imageUrl);
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
        }
      },
    }));

    //Image Handling Functions
    const handleRemoveImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        if (file.size > 500 * 1024) {
          enqueueSnackbar("File size must be under 500KB.", {
            variant: "warning",
            className: "font-poppins",
          });
          return;
        }
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    useEffect(() => {
      if (!itemId || !selectedFile) return;

      const uploadImage = async () => {
        try {
          const formData = new FormData();
          formData.append("file", selectedFile);
          await addItemImage(itemId, formData);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

      uploadImage();
    }, [itemId, selectedFile]);

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
      
    ];

    return (
      <form className="space-y-6 p-4 max-w-3xl mx-auto font-poppins">
       <Accordion type="single" collapsible>
  {accordionSections.map(({ title, content }, index) => (
    <AccordionItem key={index} value={`section-${index}`}>
      <AccordionTrigger className="text-lg text-black font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-lg font-medium text-black">
        {content}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>



      </form>
    );
  }
);

MenuItemForm.displayName = "MenuItemForm";

export default MenuItemForm;
