import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import CreateAddOnForm from './CreateAddOnForm';
import { getAllItemsInGroup } from '@/helpers/menu-utils';
import { useItemStore } from '@/store/MenuStore';
import { Input } from '@/components/UI/Input';

interface AddOnCreationViewProps {
  onBack?: () => void;
  onBackToMainForm?: () => void;
}

interface AddOnItem {
  id: number;
  name: string;
  extraPrice: number;
  isVeg: boolean;
  gst?: number;
}

const AddOnCreationView: React.FC<AddOnCreationViewProps> = ({ onBack, onBackToMainForm }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [addOnItems, setAddOnItems] = useState<AddOnItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const { addonGroupId } = useItemStore();

  useEffect(() => {
    const fetchAddOnItems = async () => {
      if (addonGroupId) {
        try {
          setLoading(true);
          const response = await getAllItemsInGroup(addonGroupId);
          const items = response?.data || response?.items || [];
          setAddOnItems(Array.isArray(items) ? items : []);
        } catch (error) {
          console.error('Error fetching addon items:', error);
          setAddOnItems([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAddOnItems();
  }, [addonGroupId]);

  const filteredItems = addOnItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemToggle = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addOnExamples = [
    {
      name: 'Extra Mushrooms',
      icon: '🍄',
      price: '₹0'
    },
    {
      name: 'Extra Cheese',
      icon: '🧀',
      price: '₹20'
    },
    {
      name: 'Extra Onions',
      icon: '🧅',
      price: '₹0'
    },
    {
      name: 'Beverages',
      icon: '🥤',
      price: '₹40'
    },
    {
      name: 'Extra Chicken Bowl',
      icon: '🍗',
      price: '₹40'
    }
  ];

  if (showCreateForm) {
    return <CreateAddOnForm 
      onBack={() => {
        setShowCreateForm(false);
        // Refresh the items list when coming back from create form
        const fetchAddOnItems = async () => {
          if (addonGroupId) {
            try {
              const response = await getAllItemsInGroup(addonGroupId);
            
              setAddOnItems(Array.isArray(response) ? response : []);
            } catch (error) {
              console.error('Error fetching addon items:', error);
            }
          }
        };
        fetchAddOnItems();
      }} 
    />;
  }

  // Show addon items list if there are items in the group
  if (!loading && addOnItems.length > 0) {
    return (
      <div className="font-poppins space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-700">
            {addOnItems.length} addon option{addOnItems.length !== 1 ? 's' : ''} available
          </h2>
          <div className="relative w-64">
            <Input
              placeholder="Search for an add-ons"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Add-on Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const gstAmount = item.gst ? (item.extraPrice * item.gst) / 100 : 0;
            const isSelected = selectedItems.includes(item.id);
            
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleItemToggle(item.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  
                  {/* Veg/Non-veg indicator */}
                  <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="font-semibold text-gray-900">₹{item.extraPrice.toFixed(2)}</span>
                    </div>
                    {gstAmount > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        GST ₹{gstAmount.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add new addon option */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full border-2 border-dashed border-blue-300 rounded-lg p-4 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add new add-on option</span>
          </div>
        </button>
      </div>
    );
  }

  // Show the original create addon view if no items exist
  return (
    <div className="border-2 border-blue-400 bg-blue-50 p-2 rounded-lg font-poppins w-[400px] mt-4 cursor-pointer">
      <div className="text-center">
        {/* Plus Icon */}
        <div className="mb-6">
          <Plus className="w-12 h-12 text-gray-600 mx-auto" strokeWidth={1.5} />
        </div>
        
        <h2 
          className="text-lg font-semibold text-gray-900 mb-8 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => setShowCreateForm(true)}
        >
          Click to create your first add-on
        </h2>
        
        {/* What is an add-on section */}
        <div className="bg-white  rounded-lg border border-gray-200 mb-8">
          <h3 className="font-semibold text-sm text-gray-800 mb-3 text-left">What is an add-on?</h3>
          <p className="text-sm text-gray-600 leading-relaxed text-left">
            Any additional item added to an item makes an add-on.
            This is an one-time creation of your menu add-ons. Later you can create add-on
            groups for each item.
          </p>
        </div>
        
        {/* Add-on Examples */}
        <div className="bg-white p-2 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-sm text-gray-800 mb-6 text-left">Add-on Examples</h3>
          <div className="flex justify-between items-center space-x-2">
            {addOnExamples.map((addon, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className=" bg-gray-100 rounded-lg flex items-center justify-center mb-2 text-2xl">
                  {addon.icon}
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">{addon.name}</p>
                <span className="text-xs font-semibold text-gray-600">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnCreationView; 