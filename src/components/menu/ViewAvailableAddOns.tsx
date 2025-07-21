import React, { useState, useEffect } from 'react';
import { Button } from '@/components/UI/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/UI/Sheet";
import { getAddonItemsPerRestaurant, LinkAddOnToItem, deleteAddonGroup } from '@/helpers/menu-utils';
import { useSnackbar } from "notistack";
import { Loader, Plus, Trash2 } from 'lucide-react';
import { useItemStore } from '@/store/MenuStore';
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

interface AddOnItem {
  id: number;
  name: string;
  extraPrice: number;
  isVeg: boolean;
  description?: string;
}

interface AddOn {
  id: number;
  name: string;
  description: string;
  isRequired: boolean;
  maxSelection: number;
  addonItems: AddOnItem[];
  linkedToAnyMenuItem: boolean;
}

interface ViewAvailableAddOnsProps {
  onAddOnLinked?: () => void;
}

const ViewAvailableAddOns: React.FC<ViewAvailableAddOnsProps> = ({ onAddOnLinked }) => {
  const [open, setOpen] = useState(false);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [linkingAddOn, setLinkingAddOn] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { itemId } = useItemStore();

  const fetchAddOns = async () => {
    setIsLoading(true);
    try {
      const response = await getAddonItemsPerRestaurant();
      setAddOns(response || []);
    } catch (error) {
      console.error('Error fetching add-ons:', error);
      enqueueSnackbar("Failed to fetch add-ons", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkAddOn = async (addOnId: number) => {
    if (!itemId) {
      enqueueSnackbar("No item selected", { variant: "error" });
      return;
    }

    setLinkingAddOn(addOnId);
    try {
      await LinkAddOnToItem(itemId, addOnId);
      enqueueSnackbar("Add-on group linked successfully!", { variant: "success" });
      // Refresh the add-ons list to update the linked status
      fetchAddOns();
      // Notify parent component to refresh its list
      onAddOnLinked?.();
      // Close the sheet
      setOpen(false);
    } catch (error) {
      console.error('Error linking add-on:', error);
      enqueueSnackbar("Failed to link add-on group", { variant: "error" });
    } finally {
      setLinkingAddOn(null);
    }
  };

  const handleDeleteAddOn = async (addOnId: number) => {
    try {
      await deleteAddonGroup(addOnId);
      enqueueSnackbar("Add-on group deleted successfully!", { variant: "success" });
      fetchAddOns();
    } catch (error) {
      console.error('Error deleting add-on:', error);
      enqueueSnackbar("Failed to delete add-on group", { variant: "error" });
    }
  };

  useEffect(() => {
    if (open) {
      fetchAddOns();
    }
  }, [open]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        View Available Add-ons
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[600px] font-poppins">
          <SheetHeader>
            <SheetTitle>Available Add-ons</SheetTitle>
          </SheetHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin" />
              <span className="ml-2">Loading add-ons...</span>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="p-4 border rounded-lg bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{addOn.name}</h3>
                      <p className="text-sm text-gray-600">{addOn.description}</p>
                      <div className="mt-2 flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          addOn.isRequired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {addOn.isRequired ? 'Required' : 'Optional'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Max: {addOn.maxSelection}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleLinkAddOn(addOn.id)}
                        disabled={linkingAddOn === addOn.id}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-50"
                      >
                        {linkingAddOn === addOn.id ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='font-poppins'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Add-on Group</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this add-on group? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteAddOn(addOn.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewAvailableAddOns; 