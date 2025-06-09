import React, { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import { Input } from '@/components/UI/Input';
// import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/Select';

const AddOnGroupForm = () => {
  const [selectionType, setSelectionType] = useState<'compulsory' | 'optional'>('compulsory');
  const [minSelection, setMinSelection] = useState<string>('');
  const [maxSelection, setMaxSelection] = useState<string>('all');

  return (
    <div className=" mx-auto  space-y-6 font-poppins">

      {/* Title of customization */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Title of customization <span className="text-red-500">*</span>
        </label>
        <Input value="Add-ons" readOnly className="w-full" />
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
            <div className="flex items-center gap-2">
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
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 flex items-center gap-1">
                Max selection <Info className="w-3 h-3 text-gray-500" />
              </span>
              <Select onValueChange={setMaxSelection}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(6)].map((_, i) => (
                    <SelectItem key={i} value={`${i}`}>{i}</SelectItem>
                  ))}
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Add options block */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Add options <span className="text-red-500">*</span>
        </label>
        <div
          className="mt-2 p-6 border-dashed border-2 border-blue-200 bg-blue-50 text-center cursor-pointer hover:bg-blue-100 transition rounded-md"
          onClick={() => {
            // trigger modal or sheet
          }}
        >
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <Plus className="w-6 h-6" />
            <p className="font-medium">Add Options To This Add-on Group</p>
            <p className="text-xs text-gray-600">Select options to add and complete this add-on group</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnGroupForm;