import React, { useState } from 'react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Label } from '@/components/UI/Label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/UI/Select';
import { useItemStore } from "@/store/MenuStore";
import { addNewVariantGroup } from "@/helpers/menu-utils";
import { useSnackbar } from "notistack";

type Option = {
    name: string;
    type: 'Veg' | 'Non-Veg';
    additionalPrice: number;
};

interface Props {
    title: string;
    basePrice: number;
    onCancel: () => void;
    onSave: (groupId: number) => void;
}

const VariantGroupEditor: React.FC<Props> = ({
    title: initialTitle,
    basePrice,
    onCancel,
    onSave,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [isLoading, setIsLoading] = useState(false);
    const [groupId, setGroupId] = useState<number | null>(null);
    const [options, setOptions] = useState<(Option & { isDefault: boolean })[]>([
        { name: '', type: 'Veg', additionalPrice: 0, isDefault: true },
        { name: '', type: 'Veg', additionalPrice: 0, isDefault: false },
    ]);
    const { itemId } = useItemStore();
    const { enqueueSnackbar } = useSnackbar();

    const setDefaultOption = (index: number) => {
        setOptions((prev) =>
            prev.map((opt, i) => ({ ...opt, isDefault: i === index }))
        );
    };

    const updateOption = (index: number, field: keyof Option, value: any) => {
        setOptions((prev) =>
            prev.map((opt, i) =>
                i === index ? { ...opt, [field]: value } : opt
            )
        );
    };

    const addOption = () => {
        setOptions([
            ...options,
            { name: '', type: 'Veg', additionalPrice: 0, isDefault: false },
        ]);
    };

    const removeOption = (index: number) => {
        setOptions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCreateGroup = async () => {
        if (!itemId) {
            enqueueSnackbar("Item ID is missing", { variant: "error" });
            return;
        }

        setIsLoading(true);
        try {
            const response = await addNewVariantGroup(title.trim(), Number(itemId));
            enqueueSnackbar("Variant group created successfully", { variant: "success" });
            setGroupId(response.id);
            onSave(response.id);
        } catch (error) {
            console.error("Error creating variant group:", error);
            enqueueSnackbar("Failed to create variant group", { variant: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 font-poppins">
            {/* Group Title */}
            <div>
                <Label className="text-md text-gray-700">Title of the variant group</Label>
                <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter variant group title"
                />
                <Button
                    className="mt-4 w-full"
                    onClick={handleCreateGroup}
                    disabled={isLoading || !title.trim()}
                >
                    {isLoading ? "Creating..." : "Create Variant Group"}
                </Button>
            </div>

            {/* Options */}
            <div className={`space-y-4 ${!groupId ? 'opacity-50 pointer-events-none' : ''}`}>
            {options.map((opt, idx) => (
                <div
                    key={idx}
                    className="flex flex-col gap-2 border-b border-gray-200 pb-4 mb-4"
                >
                    <div className="flex items-center gap-2">
                        {/* Custom Radio */}
                        <button
                            onClick={() => setDefaultOption(idx)}
                            className={`w-4 h-4 rounded-full border-2 flex-shrink-0
                ${opt.isDefault ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}
              `}
                            aria-label="Select default option"
                        />

                        {/* Inputs */}
                        <Input
                            className="w-1/3"
                            placeholder="Option name"
                            value={opt.name}
                            onChange={(e) => updateOption(idx, 'name', e.target.value)}
                        />

                        <Select
                            value={opt.type}
                            onValueChange={(val) => updateOption(idx, 'type', val as 'Veg' | 'Non-Veg')}
                        >
                            <SelectTrigger className="w-24">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Veg">Veg</SelectItem>
                                <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                            </SelectContent>
                        </Select>

                        <span>${basePrice}</span>
                        <span className="text-lg">+</span>

                        <Input
                            className="w-20"
                            type="number"
                            placeholder="$"
                             value={opt.additionalPrice.toString()}
                            onChange={(e) =>
                                updateOption(idx, 'additionalPrice', parseFloat(e.target.value || '0'))
                            }
                        />

                        <span className="text-lg">=</span>
                        <span>${(basePrice + opt.additionalPrice).toFixed(2)}</span>
                    </div>

                    {!opt.isDefault && (
                        <button
                            className="text-xs text-red-500 ml-6"
                            onClick={() => removeOption(idx)}
                        >
                            REMOVE
                        </button>
                    )}
                </div>
            ))}

            {/* Add more option */}
            <button
                className="text-blue-600 text-sm font-medium"
                onClick={addOption}
            >
                ADD MORE OPTION
            </button>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default VariantGroupEditor;
