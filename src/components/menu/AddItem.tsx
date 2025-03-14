import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from "react";
import { Input } from "../UI/Input";
import Dropdown from "./DropDown";
import { Textarea } from "../UI/TextArea";
import { formSchema } from "./formSchema";
import { useItemStore } from "@/store/MenuStore";
import { X } from "lucide-react";
import { addItemImage } from "@/helpers/api-utils";

interface AddItemProps {
  allCategories: { id: number; name: string }[];
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const AddItem = forwardRef(
  ({ allCategories, formData, onFormDataChange }: AddItemProps, ref) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { selectedItem, setSelectedItem,itemId } = useItemStore();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const savedItem = selectedItem?.data;
    const { categoryValue } = useItemStore();



    const handleRemoveImage = () => {
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input field to allow selecting the same file again
      }
    };

    useEffect(() => {
      if (savedItem) {
        onFormDataChange("title", savedItem.title);
        onFormDataChange("description", savedItem.description);
        onFormDataChange("price", savedItem.price);
        onFormDataChange("selectedCategory", categoryValue);
        // onFormDataChange("selectedCategory", savedItem.name);
        onFormDataChange("foodType", savedItem.isVeg);
        onFormDataChange("id", savedItem.id);
        onFormDataChange("restaurantCategory", { id: 1 });
        setImagePreview(savedItem.imageUrl);
      }
    }, [savedItem, categoryValue]);
    useEffect(() => {
      if (selectedItem) {
        // Update the selectedItem object entirely
        setSelectedItem({
          title: formData.title,
          id: formData.id,
          description: formData.description,
          price: formData.price,
          selectedCategory: categoryValue,
          isVeg: formData.foodType,
          isStock: true,
          restaurantCategory: { id: 1 },
        });
      }
    }, [formData, categoryValue]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (file) {
    if (file.size > 500 * 1024) {
      alert("File size must be under 500KB.");
      return;
    }
    console.log(file, "FILE");
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  }
};

useEffect(() => {
  if (!itemId || !selectedFile) return; 

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await addItemImage(itemId, formData);
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  uploadImage();
}, [itemId, selectedFile]); 


    useImperativeHandle(ref, () => ({
      getItemData: () => {
        const validationResult = formSchema.safeParse(formData);
        if (!validationResult.success) {
          console.error("Validation Errors:", validationResult.error.errors);
          const validationErrors: Record<string, string> = {};
          validationResult.error.errors.forEach((err) => {
            const path = err.path.join(".");
            validationErrors[path] = err.message;
          });
          setErrors(validationErrors);
          throw new Error("Validation failed");
        }

        return {
          name: formData.selectedCategory,
          description: formData.description,
          isDisabled: false,
          items: [
            {
              title: formData.title,
              description: formData.description,
              price: parseFloat(formData.price),
              imageUrl: "https://example.com/image.jpg",
              isStock: true,
              isVeg: formData.foodType === true,
            },
          ],
          restaurantCategory: {
            id: formData.restaurantCategory.id,
          },
        };
      },
    }));

    return (
      <div className="font-poppins">
        <div className="m-6">
          <div className="text-red-500 text-[14px]">{errors.title}</div>
          <Input
            placeholder="Enter Item Name"
            className="w-11/12 h-[42px] rounded-[16px] shadow-none"
            value={formData.title}
            onChange={(e) => {
              onFormDataChange("title", e.target.value);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
          />
        </div>

        <div className="mx-6 text-[17px] font-bold">Category</div>
        <div className="mb-2 mx-6 text-red-500 text-[14px]">{errors.name}</div>
        <div className="w-fit whitespace-nowrap mx-6">
          <Dropdown
            label="Select Category"
            options={allCategories}
            selected={formData.selectedCategory || "Select Category"}
            onSelect={(selectedId) => {
              const selectedCategory = allCategories.find(
                (category) => category.id === selectedId
              );

              if (selectedCategory) {
                onFormDataChange("restaurantCategory", {
                  id: selectedCategory.id,
                });
                onFormDataChange("selectedCategory", selectedCategory.name);
                setErrors((prev) => ({
                  ...prev,
                  selectedCategory: "",
                  "restaurantCategory.id": "",
                }));
              }
            }}
          />
        </div>
        <div className="mx-6 mt-2 text-[17px] font-bold">Food Type</div>
        <div className="flex gap-x-6 px-4 py-1">
          {[
            { label: "Veg", value: true, color: "bg-green-500" },
            { label: "Non-Veg", value: false, color: "bg-red-500" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className={`border cursor-pointer flex justify-center border-borderColor py-2 px-6 rounded-[16px] min-w-32 ${
                formData.isVeg === value ? `${color} text-white` : ""
              }`}
              onClick={() => onFormDataChange("isVeg", value)}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="mx-6 my-2">
          <span className="font-bold">Pricing</span>
          <div className="mb-2 text-red-500 text-[14px]">{errors.price}</div>
          <Input
            placeholder="₹"
            className="h-[42px] rounded-[16px] shadow-none"
            value={formData.price}
            onChange={(e) => {
              onFormDataChange("price", e.target.value);
              setErrors((prev) => ({ ...prev, price: "" }));
            }}
          />
        </div>
        <div className="mx-6 my-2 flex flex-col py-2">
          <span className="font-bold">Item Image</span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="my-2"
          />

          {imagePreview && (
            <div className="relative mt-2 w-32 h-32">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full rounded-md object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-gray-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="mx-6 my-4">
          <span className="font-bold">Item Description</span>
          <div className="mb-2 text-red-500 text-[14px]">
            {errors.description}
          </div>
          <Textarea
            className="rounded-[16px] h-[106px] shadow-none"
            value={formData.description}
            onChange={(e) => {
              onFormDataChange("description", e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
          />
        </div>

        <div className="flex items-center gap-x-8">
          <div className="w-1/3 mx-6">
            <div className="my-2 font-bold">Serving Info</div>
            <Dropdown
              label="Serves"
              options={[1, 2, 3, 4]}
              selected={formData.servingInfo}
              onSelect={(value) => {
                onFormDataChange("servingInfo", value);
                setErrors((prev) => ({ ...prev, servingInfo: "" }));
              }}
            />
          </div>

          <div className="w-1/3 mx-6">
            <div className="my-2 font-bold">Portion Size</div>
            <Dropdown
              label="ml"
              options={[150, 300, 500, 1000]}
              selected={formData.portionSize}
              onSelect={(value) => {
                onFormDataChange("portionSize", value);
                setErrors((prev) => ({ ...prev, portionSize: "" }));
              }}
            />
          </div>
        </div>

        <div className="mx-6 my-2">
          <span className="font-bold">Preparation Time (in min)</span>
          <Input
            className="h-[42px] rounded-[16px] shadow-none"
            value={formData.preparationTime}
            onChange={(e) => {
              onFormDataChange("preparationTime", e.target.value);
              setErrors((prev) => ({ ...prev, preparationTime: "" }));
            }}
          />
        </div>
      </div>
    );
  }
);

export default AddItem;
