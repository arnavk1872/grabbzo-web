import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { useSnackbar } from 'notistack';
import { useItemStore } from '@/store/MenuStore';
import { addNewAddOnItem } from '@/helpers/menu-utils';

interface CreateAddOnFormProps {
  onBack: () => void;
}

const CreateAddOnForm: React.FC<CreateAddOnFormProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [extraPrice, setExtraPrice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { addonGroupId } = useItemStore();
  const maxNameLength = 80;

  const isFormValid = name.trim();

  const handleSave = async () => {
    if (!isFormValid) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    const formData = {
      name: name.trim(),
      extraPrice: parseFloat(extraPrice) || 0,
    };

    setIsLoading(true);
    try {
      const response = await addNewAddOnItem(formData, addonGroupId);
      enqueueSnackbar('Add-on item created successfully!', { variant: 'success' });
      console.log('Add-on item created:', response);
      // Reset form
      setName('');
      setExtraPrice('0');
    } catch (error) {
      console.error('Error creating add-on item:', error);
      enqueueSnackbar('Failed to create add-on item', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 font-poppins w-[400px]">
      <div>
        <label className="block text-sm font-medium text-gray-700 mt-4">Name</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={maxNameLength}
          placeholder="Enter add-on name"
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">
          {name.length}/{maxNameLength} characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Extra Price</label>
        <Input
          type="number"
          value={extraPrice}
          onChange={(e) => setExtraPrice(e.target.value)}
          placeholder="0.00"
          className="mt-1"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          onClick={onBack}
          variant="outline"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isFormValid || isLoading}
          className='text-white'
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default CreateAddOnForm; 