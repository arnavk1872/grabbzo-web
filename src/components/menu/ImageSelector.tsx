import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useItemStore } from '@/store/MenuStore';
import { addItemImage } from '@/helpers/menu-utils';
import { useSnackbar } from 'notistack';

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_SIZE_MB = 0.5; // 500KB

const ImageSelector: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { itemId, selectedItem } = useItemStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (selectedItem?.data?.imageUrl) {
      setPreviewUrl(selectedItem.data.imageUrl);
    }
  }, [selectedItem]);

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setError('Only JPG or PNG formats are allowed.');
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!itemId || !selectedFile) return;

    const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await addItemImage(itemId, formData);
        enqueueSnackbar("Image uploaded successfully", {
          variant: "success",
          className: "font-poppins",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        enqueueSnackbar("Failed to upload image", {
          variant: "error",
          className: "font-poppins",
        });
      }
    };

    uploadImage();
  }, [itemId, selectedFile]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <p className="text-sm text-gray-600">Select a good quality image of this item</p>

      <div className="bg-orange-100 border-l-4 border-orange-400 text-orange-700 px-4 py-2 text-sm rounded">
        Adding images for an item results in up to 3–5% more orders
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="h-40 border-2 border-dashed border-blue-300 bg-blue-50 rounded-md flex items-center justify-center cursor-pointer relative"
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full object-contain rounded"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-gray-500 text-white rounded-full p-1 hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <div className="text-center text-blue-600 font-semibold">
            <div className="text-3xl mb-1">⬆</div>
            BROWSE
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/jpeg, image/png"
          className="hidden"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="bg-gray-100 p-3 text-sm text-center rounded grid grid-cols-3 gap-4">
        <div>
          <strong>FORMATS</strong>
          <br /> JPG, PNG
        </div>
        <div>
          <strong>MAX SIZE</strong>
          <br /> 500 KB
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
