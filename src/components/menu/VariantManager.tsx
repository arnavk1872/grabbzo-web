import React, { useState, useEffect } from 'react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Label } from '@/components/UI/Label';
import { useItemStore } from "@/store/MenuStore";
import { addNewVariant, getAllVariants, deleteVariant } from "@/helpers/menu-utils";
import { useSnackbar } from "notistack";
import { Plus, Trash2 } from 'lucide-react';
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

interface Props {
  groupId: number;
  groupName: string;
  onSuccess: () => void;
}

const VariantManager: React.FC<Props> = ({
  groupId,
  groupName,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [additionalPrice, setAdditionalPrice] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [variants, setVariants] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { itemId } = useItemStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchVariants();
  }, [groupId]);

  const fetchVariants = async () => {
    try {
      const response = await getAllVariants(groupId);
      setVariants(response || []);
    } catch (error) {
      console.error("Error fetching variants:", error);
      enqueueSnackbar("Failed to load variants", { variant: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      enqueueSnackbar("Variant name is required", { variant: "error" });
      return;
    }

    try {
      const formData = {
        name: name,
        extraPrice: parseFloat(additionalPrice)
      };

      const response = await addNewVariant(formData, groupId);
      enqueueSnackbar("Variant added successfully", { variant: "success" });
      setName("");
      setAdditionalPrice("0");
      setShowAddForm(false);
      fetchVariants();
      onSuccess();
    } catch (error) {
      console.error("Error adding variant:", error);
      enqueueSnackbar("Failed to add variant", { variant: "error" });
    }
  };

  const handleDeleteVariant = async (variantId: number) => {
    try {
      await deleteVariant(variantId);
      enqueueSnackbar("Variant deleted successfully", { variant: "success" });
      fetchVariants();
      onSuccess();
    } catch (error) {
      console.error("Error deleting variant:", error);
      enqueueSnackbar("Failed to delete variant", { variant: "error" });
    }
  };

  return (
    <div className="space-y-6 font-poppins">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Variants in {groupName}</h3>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-white"
        >
          <Plus className="w-4 h-4 text-white" />
          Add Variant
        </Button>
      </div>

      {/* Variants List */}
      <div className="space-y-4">
        {variants.map((variant) => (
          <div 
            key={variant.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">{variant.name}</h4>
                <p className="text-sm text-gray-600">Extra Price: ₹{variant.extraPrice}</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-red-600 hover:text-red-800 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Variant</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this variant? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteVariant(variant.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      {/* Add Variant Form */}
      {showAddForm && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Add New Variant</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm text-gray-700">Variant Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter variant name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm text-gray-700">Additional Price (₹)</Label>
              <Input
                type="number"
                value={additionalPrice}
                onChange={(e) => setAdditionalPrice(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className='text-white'
                disabled={isLoading || !name.trim()}
              >
                {isLoading ? 'Adding...' : 'Add Variant'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VariantManager; 