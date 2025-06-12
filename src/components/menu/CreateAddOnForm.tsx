import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { addNewAddOnItem } from '@/helpers/menu-utils';
import { useSnackbar } from 'notistack';
import { useItemStore } from '@/store/MenuStore';

interface CreateAddOnFormProps {
  onBack?: () => void;
}

const CreateAddOnForm: React.FC<CreateAddOnFormProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [vegType, setVegType] = useState('');
  const [extraPrice, setExtraPrice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { addonGroupId } = useItemStore();
  const maxNameLength = 80;

  const isFormValid = name.trim() && vegType;

  const handleSave = async () => {
    if (!isFormValid) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    const formData = {
      name: name.trim(),
      extraPrice: parseFloat(extraPrice) || 0,
      isVeg: vegType === 'veg'
    };

    setIsLoading(true);
    try {
      const response = await addNewAddOnItem(formData, addonGroupId);
      enqueueSnackbar('Add-on item created successfully!', { variant: 'success' });
      console.log('Add-on item created:', response);
      // Reset form
      setName('');
      setVegType('');
      setExtraPrice('0');
    } catch (error) {
      console.error('Error creating add-on item:', error);
      enqueueSnackbar('Failed to create add-on item', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-poppins w-[400px] mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">Create new add-on</h1>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || !isFormValid}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
      
      {/* Blue underline */}
      <div className="h-1 bg-blue-500 mb-6"></div>
      
      {/* Form */}
      <div className="space-y-6">
        {/* Title of the add-on */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Title of the add-on<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              placeholder="Addon Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={maxNameLength}
              className="w-full pr-16"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
              {name.length}/{maxNameLength}
            </span>
          </div>
        </div>

        {/* Select Veg / Non-Veg */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Veg / Non-Veg<span className="text-red-500">*</span>
          </label>
          <Select onValueChange={setVegType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="veg">Veg</SelectItem>
              <SelectItem value="non-veg">Non-Veg</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Extra Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Extra Price
          </label>
          <Input
            type="number"
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
            className="w-full"
            min="0"
            step="1"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAddOnForm; 