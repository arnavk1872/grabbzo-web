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
} from './MenuSheet'; 
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
import CreateAddOnForm from './CreateAddOnForm';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/UI/Tooltip'; // ensure this import
import { Button } from '@/components/UI/Button';
import { getAllLinkedToItem, UnlinkAddOnToItem, getAddonItemsPerGroup, deleteAddonItemsPerGroup } from '@/helpers/menu-utils';
import { useItemStore } from '@/store/MenuStore';
import { useSnackbar } from 'notistack';
import ViewAvailableAddOns from './ViewAvailableAddOns';



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
  name: string;
  description: string;
  isRequired: boolean;
  maxSelection: number;
  addonItems: Array<{
    id: number;
    name: string;
    extraPrice: number;
    isVeg: boolean;
  }>;
  linkedToAnyMenuItem: boolean;
}

const ItemAddOns: React.FC = () => {
  const [selected, setSelected] = useState<OptionType>('Add-ons');
  const [openSheet, setOpenSheet] = useState(false);
  const [openNewGroupSheet, setOpenNewGroupSheet] = useState(false);
  const [sheetContent, setSheetContent] = useState<ItemAddOn | null>(null);
  const [linkedAddOns, setLinkedAddOns] = useState<LinkedAddOnGroup[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New state for addon items sheet
  const [openAddonItemsSheet, setOpenAddonItemsSheet] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [addonItemsData, setAddonItemsData] = useState<any>(null);
  const [loadingAddonItems, setLoadingAddonItems] = useState(false);
  const [openCreateAddonItemSheet, setOpenCreateAddonItemSheet] = useState(false);

  const { itemId } = useItemStore();
  const { enqueueSnackbar } = useSnackbar();
  const { setAddonGroupId } = useItemStore();

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

  const handleAddonGroupClick = async (groupId: number, groupTitle: string) => {
    setSelectedGroupId(groupId);
    setAddonGroupId(groupId);
    setLoadingAddonItems(true);
    setOpenAddonItemsSheet(true);
    
    try {
      const response = await getAddonItemsPerGroup(groupId);
      console.log('Addon items response:', response);
      setAddonItemsData(response);
    } catch (error) {
      console.error('Error fetching addon items:', error);
      enqueueSnackbar('Failed to load addon items', { 
        variant: 'error',
        className: 'font-poppins'
      });
    } finally {
      setLoadingAddonItems(false);
    }
  };

  const fetchLinkedAddOns = async () => {
    if (itemId) {
      try {
        setLoading(true);
        console.log(itemId,"ITEM ID");
        
        const response = await getAllLinkedToItem(itemId);
        console.log('Linked add-ons response:', response);
        setLinkedAddOns(response || []);
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

  const handleDeleteAddOnItem = async (itemId: number) => {
    try {
      await deleteAddonItemsPerGroup(itemId);
      enqueueSnackbar('Add-on item removed successfully!', { 
        variant: 'success',
        className: 'font-poppins'
      });
      
      // Update the local state by filtering out the deleted item
      if (addonItemsData?.addonItems) {
        setAddonItemsData({
          ...addonItemsData,
          addonItems: addonItemsData.addonItems.filter((item: any) => item.id !== itemId)
        });
      }
    } catch (error) {
      console.error('Error deleting add-on item:', error);
      enqueueSnackbar('Failed to remove add-on item', { 
        variant: 'error',
        className: 'font-poppins'
      });
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
console.log(linkedAddOns, "LINKED ADD ONS", "LINKED ADD ONS");

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 font-poppins">
      {/* Show existing linked add-ons if they exist */}
      {linkedAddOns && linkedAddOns.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            
            <ViewAvailableAddOns onAddOnLinked={fetchLinkedAddOns} />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenSheet(true);
                setSheetContent({
                  type: 'Add-ons',
                  title: 'Add-ons',
                  description: 'Add-ons like Curd, Coke, Raita, etc',
                  icon: <UtensilsCrossed className="w-6 h-6" />
                });
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add New Group
            </button>
          </div>
          
          <div className="space-y-2">
            {linkedAddOns.map((group) => {
              console.log('Group:', group);
              console.log('Addon Items:', group.addonItems);
              return (
                <div
                  key={group.id}
                  className="border border-gray-200 rounded-lg px-3 py-1 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleAddonGroupClick(group.id, group.name)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{group.name || 'Unnamed Group'}</h4>
                      <p className="text-sm text-gray-600">{group.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        group.isRequired 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {group.isRequired ? 'Required' : 'Optional'}
                      </span>
                      <span className="text-xs text-gray-500">
                        Max: {group.maxSelection}
                      </span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Add-on Group</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this add-on group? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteAddOnGroup(group.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Addon Items */}
                  <div className="pl-4 border-l-2 border-gray-200 space-y-2">
                    {group.addonItems?.map((item: { id: number; name: string; extraPrice: number; isVeg: boolean }) => {
                      console.log('Item:', item);
                      return (
                        <div key={item.id} className="flex items-center justify-between py-1">
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-600">₹{item.extraPrice}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.isVeg ? 'Veg' : 'Non-veg'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
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
            <ViewAvailableAddOns onAddOnLinked={fetchLinkedAddOns} />
          </div>

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
        </>
      )}

      {/* Add New Group Sheet */}
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

      {/* Addon Items Sheet */}
      <Sheet open={openAddonItemsSheet} onOpenChange={setOpenAddonItemsSheet}>
        <SheetContent className='w-[400px] font-poppins'>
          <SheetHeader className='text-xl font-semibold font-poppins'>
            {loadingAddonItems ? (
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Loading addon items...</span>
              </div>
            ) : (
              addonItemsData?.title || 'Addon Items'
            )}
          </SheetHeader>
          
          {!loadingAddonItems && addonItemsData && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    addonItemsData.isRequired 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {addonItemsData.isRequired ? 'Required' : 'Optional'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Max Selection: {addonItemsData.maxSelection}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setOpenCreateAddonItemSheet(true);
                    setOpenAddonItemsSheet(false);
                  }}
                  className="text-sm text-white"
                >
                  + Add New Item
                </Button>
              </div>

              <div className="space-y-2">
                {addonItemsData.addonItems?.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.extraPrice}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isVeg ? 'Veg' : 'Non-veg'}
                      </span>
                      <button
                        onClick={() => handleDeleteAddOnItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Addon Item Sheet */}
      <Sheet open={openCreateAddonItemSheet} onOpenChange={setOpenCreateAddonItemSheet}>
        <SheetContent className='w-fit'>
          <SheetHeader className='text-xl font-semibold font-poppins'>Add New Item</SheetHeader>
          <CreateAddOnForm
            onBack={() => {
              setOpenCreateAddonItemSheet(false);
              setOpenAddonItemsSheet(true);
              handleAddonGroupClick(selectedGroupId!, addonItemsData?.title || '');
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ItemAddOns;
