import React, { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';
import { addNewAddOnGroup, LinkAddOnToItem } from '@/helpers/menu-utils';
import { useSnackbar } from 'notistack';
import { useItemStore } from '@/store/MenuStore';

interface AddOnGroupFormProps {
  onSuccess?: () => void;
}

const AddOnGroupForm: React.FC<AddOnGroupFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('Add-ons');
  const [description, setDescription] = useState('');
  const [selectionType, setSelectionType] = useState<'compulsory' | 'optional'>('compulsory');
  const [maxSelection, setMaxSelection] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { addonGroupId, setAddonGroupId, itemId } = useItemStore();


  const isFormValid = title.trim() && description.trim();

  const handleSave = async () => {
    if (!isFormValid) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    const formData = {
      name: title.trim(),
      description: description.trim(),
      isRequired: selectionType === 'compulsory',
      maxSelection: parseInt(maxSelection)
    };

    setIsLoading(true);
    try {
      const response = await addNewAddOnGroup(formData);
      enqueueSnackbar('Add-on group created successfully!', { variant: 'success' });
      setIsSaved(true);
      setAddonGroupId(response.data?.id || response.id);
      await LinkAddOnToItem(itemId, response.data?.id || response.id);

      // Call the success callback to refresh the parent component
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating add-on group:', error);
      enqueueSnackbar('Failed to create add-on group', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="space-y-2 font-poppins">
      {/* Header with Save Button */}
      <div className="flex justify-end mb-4 -mt-8 ">
        <Button
          onClick={handleSave}
          disabled={isLoading || !isFormValid}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {/* Title of customization */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Title of customization <span className="text-red-500">*</span>
        </label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Description<span className="text-red-500">*</span>
        </label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" />
      </div>

      {/* Customization behaviour */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Customization behaviour <span className="text-red-500">*</span>
        </label>
        <div className="bg-gray-50 p-4 rounded-md border space-y-4">
          {/* Customer selection type */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 flex items-center gap-1">
              Customer selection is <Info className="w-3 h-3 text-gray-500" />
            </span>
            <div className="flex gap-4 ml-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="compulsory"
                  name="selectionType"
                  value="compulsory"
                  checked={selectionType === 'compulsory'}
                  onChange={() => setSelectionType('compulsory')}
                  className="form-radio text-blue-600"
                />
                <label htmlFor="compulsory">Compulsory</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="optional"
                  name="selectionType"
                  value="optional"
                  checked={selectionType === 'optional'}
                  onChange={() => setSelectionType('optional')}
                  className="form-radio text-blue-600"
                />
                <label htmlFor="optional">Optional</label>
              </div>
            </div>
          </div>

          {/* Min & Max selection */}
          <div className="flex items-center gap-6 mt-2">
            {/* <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 flex items-center gap-1">
                Min selection <Info className="w-3 h-3 text-gray-500" />
              </span>
              <Select onValueChange={setMinSelection}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(6)].map((_, i) => (
                    <SelectItem key={i} value={`${i}`}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 flex items-center gap-1">
                Max selection <Info className="w-3 h-3 text-gray-500" />
              </span>
              <Select onValueChange={setMaxSelection}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(5)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AddOnGroupForm;