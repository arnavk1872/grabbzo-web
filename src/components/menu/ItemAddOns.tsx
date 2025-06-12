import React, { useState, useEffect } from 'react';
import {
  Plus,
  Info,
  UtensilsCrossed,
  Pizza,
  LucideReceiptCent,
  Loader,
  Trash2,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './MenuSheet'; // Ensure you have this from shadcn/ui
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
} from '@/components/AlertDialog';
import AddOnGroupForm from './AddOnGroupForm';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/UI/Tooltip'; // ensure this import
import { getAllLinkedToItem, UnlinkAddOnToItem } from '@/helpers/menu-utils';
import { useItemStore } from '@/store/MenuStore';
import { useSnackbar } from 'notistack';



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
    description: "Build your own addon group if you didn't find one above",
    icon: <Plus className="w-6 h-6" />,
  },
];

interface LinkedAddOnGroup {
  id: number;
  title: string;
  description: string;
  isRequired: boolean;
  maxSelection: number;
  addOnItems: Array<{
    id: number;
    name: string;
    extraPrice: number;
    isVeg: boolean;
  }>;
}

const ItemAddOns: React.FC = () => {
  const [selected, setSelected] = useState<OptionType>('Add-ons');
  const [openSheet, setOpenSheet] = useState(false);
  const [sheetContent, setSheetContent] = useState<ItemAddOn | null>(null);
  const [linkedAddOns, setLinkedAddOns] = useState<LinkedAddOnGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const { itemId } = useItemStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteAddOnGroup = async (addOnGroupId: number) => {
    try {
      await UnlinkAddOnToItem(itemId, addOnGroupId);
      enqueueSnackbar('Add-on group removed successfully!', { 
        variant: 'success',
        className: 'font-poppins'
      });
      // Refresh the linked add-ons list
      fetchLinkedAddOns();
    } catch (error) {
      console.error('Error unlinking add-on group:', error);
      enqueueSnackbar('Failed to remove add-on group', { 
        variant: 'error',
        className: 'font-poppins'
      });
    }
  };

  const fetchLinkedAddOns = async () => {
    if (itemId) {
      try {
        setLoading(true);
        console.log(itemId,"ITEM ID");
        
        const response = await getAllLinkedToItem(itemId);
        console.log('Linked add-ons response:', response);
        setLinkedAddOns(response?.data || response || []);
      } catch (error) {
        console.error('Error fetching linked add-ons:', error);
        setLinkedAddOns([]);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkedAddOns();
  }, [itemId]);

  const handleOptionClick = (opt: ItemAddOn) => {
    setSelected(opt.type);
    setSheetContent(opt);
    // If we're already in a sheet (adding new group), keep it open and show the form
    // Otherwise open the sheet (this is for the original flow)
    if (!openSheet) {
      setOpenSheet(true);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-4 font-poppins">
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading add-ons...</span>
        </div>
      </div>
    );
  }

  // Show existing linked add-ons if they exist
  if (linkedAddOns && linkedAddOns.length > 0) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-4 font-poppins">
        <div className="flex items-center justify-between">
         
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenSheet(true);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add New Group
          </button>
        </div>
        
        <div className="space-y-2">
          {linkedAddOns.map((group) => (
            <div
              key={group.id}
              className="border border-gray-200 rounded-lg px-3 py-1 bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{group.title}</h4>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      group.isRequired 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {group.isRequired ? 'Required' : 'Optional'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Max: {group.maxSelection}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="Remove add-on group"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="font-poppins">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Add-on Group</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this add-on group? This action will unlink the group from this item. The add-on group itself will not be deleted and can be reused for other items.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDeleteAddOnGroup(group.id)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              {group.addOnItems && group.addOnItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Add-on Items ({group.addOnItems.length}):
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {group.addOnItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            item.isVeg ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                          +₹{item.extraPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sheet for adding new group */}
        <Sheet open={openSheet} onOpenChange={(open) => {
          setOpenSheet(open);
          if (!open) {
            setSheetContent(null); // Reset sheet content when closing
          }
        }}>
          <SheetContent className='w-[400px]'>
            <SheetHeader className='text-xl font-semibold font-poppins'>
              {sheetContent ? `Add ${sheetContent.title}` : 'Add New Add-on Group'}
            </SheetHeader>
            <div className="mt-4">
              {sheetContent ? (
                // Show the AddOnGroupForm when an option is selected
                <AddOnGroupForm 
                  onSuccess={() => {
                    // Refresh the linked add-ons data
                    fetchLinkedAddOns();
                    // Close the sheet
                    setOpenSheet(false);
                    setSheetContent(null);
                  }}
                />
              ) : (
                // Show the option selection UI
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    You can offer customisation options like topping, extras, addons for customers.
                    <br />
                    You can also define if customer selection of these options is optional or mandatory.
                  </p>

                  <TooltipProvider>
                    <div className="flex items-center gap-2 text-teal-600 font-semibold font-poppins mb-4">
                      <span>What's this</span>
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

                  <div className="grid grid-cols-2 gap-4 font-poppins">
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
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Show the original add-ons selection UI if no linked add-ons exist
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 font-poppins">
      <p className="text-sm text-gray-600">
        You can offer customisation options like topping, extras, addons for customers.
        <br />
        You can also define if customer selection of these options is optional or mandatory.
      </p>

      <TooltipProvider>
  <div className="flex items-center gap-2 text-teal-600 font-semibold font-poppins">
    <span>What's this</span>
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
              <AddOnGroupForm
                onSuccess={() => {
                  // Refresh the linked add-ons data
                  fetchLinkedAddOns();
                  // Close the sheet
                  setOpenSheet(false);
                  setSheetContent(null);
                }}
              />
            
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default ItemAddOns;
