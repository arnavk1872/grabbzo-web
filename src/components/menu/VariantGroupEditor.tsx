import React, { useState } from 'react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Label } from '@/components/UI/Label';
import { useItemStore } from "@/store/MenuStore";
import { addNewVariantGroup } from "@/helpers/menu-utils";
import { useSnackbar } from "notistack";


interface Props {
    title: string;
    basePrice: number;
    onCancel: () => void;
    onSave: (groupId: number) => void;
}

const VariantGroupEditor: React.FC<Props> = ({
    title: initialTitle,
    onCancel,
    onSave,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [isLoading, setIsLoading] = useState(false);
    const [groupId, setGroupId] = useState<number | null>(null);
    const { itemId } = useItemStore();
    const { enqueueSnackbar } = useSnackbar();



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
                    className="mt-4 w-full text-white"
                    onClick={handleCreateGroup}
                    disabled={isLoading || !title.trim()}
                >
                    {isLoading ? "Creating..." : "Create Variant Group"}
                </Button>
            </div>

            {/* Options */}
            <div className={`space-y-4 ${!groupId ? 'opacity-50 pointer-events-none' : ''}`}>
            

        
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
