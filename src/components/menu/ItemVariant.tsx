import React, { useState, useEffect } from 'react';
import { Info, Loader, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import { useSnackbar } from "notistack";
import { addNewVariantGroup, getAllVariantGroups, deleteVariantGroup } from "@/helpers/menu-utils";
import { useItemStore } from "@/store/MenuStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './MenuSheet';
import VariantGroupEditor from './VariantGroupEditor';
import VariantManager from './VariantManager';
import Quantity from '../Icons/MenuIcons/Quantity';
import Prepration from '../Icons/MenuIcons/Prepration';
import Size from '../Icons/MenuIcons/Size';
import Base from '../Icons/MenuIcons/Base';
import Rice from '../Icons/MenuIcons/Rice';
import Plus from '../Icons/MenuIcons/Plus';

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
    icon: <Quantity/>,
    bgColor: 'bg-[#D0EFEC]',
    border: true,
  },
  {
    title: 'Preparation type',
    description: 'Item preparation style, eg - Halal, Non-Halal, etc',
    icon: <span className="text-3xl"><Prepration/></span>,
    bgColor: 'bg-[#D1E8F2]',
  },
  {
    title: 'Size',
    description: 'Different sizes of an item, eg- bread size, pizza - 6", 12", etc',
    icon: <span className="text-3xl"><Size/></span>,
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Base',
    description: 'Item Base types, eg - wheat bread, multi grain bread, etc',
    icon: <span className="text-3xl"><Base/></span>,
    bgColor: 'bg-rose-100',
  },
  {
    title: 'Rice',
    description: "Choice of item's rice selection.",
    icon: <span className="text-3xl"><Rice/></span>,
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Make your own',
    description: "Build your own addon group if you didn't find one above",
    icon: <span className="text-3xl"><Plus/></span>,
    bgColor: 'border border-dashed',
  },
];

interface ItemVariantProps {
  onAccordionOpen: () => boolean;
}

const ItemVariant: React.FC<ItemVariantProps> = ({ onAccordionOpen }) => {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption | null>(null);
  const [open, setOpen] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [variantGroups, setVariantGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [openVariantManager, setOpenVariantManager] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { itemId } = useItemStore();

  useEffect(() => {
    const isOpen = onAccordionOpen();
    if (isOpen) {
      fetchVariantGroups();
    }
  }, [onAccordionOpen]);

  const fetchVariantGroups = async () => {
    if (!itemId) return;
    
    setLoading(true);
    try {
      const response = await getAllVariantGroups(itemId);
      setVariantGroups(response || []);
    } catch (error) {
      console.error('Error fetching variant groups:', error);
      enqueueSnackbar('Failed to load variant groups', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVariantClick = async (opt: VariantOption) => {
    setSelectedVariant(opt);
    setOpen(true);
    setGroupId(null);
  };

  const handleSaveVariantGroup = (newGroupId: number) => {
    setGroupId(newGroupId);
    fetchVariantGroups(); // Refresh the list after adding a new group
  };

  const handleDeleteVariantGroup = async (groupId: number) => {
    try {
      await deleteVariantGroup(groupId);
      enqueueSnackbar('Variant group removed successfully!', { 
        variant: 'success',
        className: 'font-poppins'
      });
      fetchVariantGroups(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting variant group:', error);
      enqueueSnackbar('Failed to remove variant group', { 
        variant: 'error',
        className: 'font-poppins'
      });
    }
  };

  const handleGroupClick = (group: any) => {
    setSelectedGroup(group);
    setOpenVariantManager(true);
  };

  return (
    <div className="space-y-4 font-poppins">
      {/* Title with tooltip */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-teal-800">What's this</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <Info className="w-4 h-4 text-teal-700" />
              </span>
            </TooltipTrigger>

            <TooltipContent side="right" className="text-sm max-w-xs text-white font-poppins bg-teal-600">
            You can offer product variants like quantity, Size, or Prepration type for the customer to choose from. Declaring a variant for an item is optional.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Existing Variant Groups */}
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader className="w-6 h-6 animate-spin text-teal-600" />
        </div>
      ) : variantGroups.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Existing Variant Groups</h3>
          <div className="grid grid-cols-1 gap-3">
            {variantGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleGroupClick(group)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    {group.variants && group.variants.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {group.variants.map((variant: any) => (
                          <div key={variant.id} className="text-sm text-gray-600">
                            • {variant.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='font-poppins'>
                        <AlertDialogHeader>
                          <AlertDialogTitle >Remove Variant Group</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this variant group? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteVariantGroup(group.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Option Grid */}
      <div className="grid grid-cols-2 gap-4 font-poppins">
        {variantOptions.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => handleVariantClick(opt)}
            className={`flex items-center gap-3 p-4 rounded-md cursor-pointer shadow-sm transition hover:shadow-md
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

      {/* Shared Sheet Modal for creating new groups */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-1/2">
          <SheetHeader>
            <SheetTitle className='font-poppins text-[24px]'>Add {selectedVariant?.title}</SheetTitle>
          </SheetHeader>
          {selectedVariant && (
            <VariantGroupEditor
              title={selectedVariant.title}
              basePrice={20}
              onCancel={() => setOpen(false)}
              onSave={handleSaveVariantGroup}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Variant Manager Sheet */}
      <Sheet open={openVariantManager} onOpenChange={setOpenVariantManager}>
        <SheetContent className="w-1/2">
          <SheetHeader>
            <SheetTitle className='font-poppins text-[30px]'>Manage Variants</SheetTitle>
          </SheetHeader>
          {selectedGroup && (
            <VariantManager
              groupId={selectedGroup.id}
              groupName={selectedGroup.name}
              onSuccess={() => {
                fetchVariantGroups();
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ItemVariant;
