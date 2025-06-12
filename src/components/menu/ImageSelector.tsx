import React, { useState, useRef } from 'react';

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_SIZE_MB = 20;
const REQUIRED_DIMENSIONS = { width: 133, height: 133 };

const ImageSelector: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (file: File) => {
    setError(null);
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        if (
          img.width !== REQUIRED_DIMENSIONS.width ||
          img.height !== REQUIRED_DIMENSIONS.height
        ) {
          setError(`Image must be ${REQUIRED_DIMENSIONS.width}px × ${REQUIRED_DIMENSIONS.height}px`);
          return;
        }
        setPreviewUrl(reader.result as string);
      };
      img.src = reader.result as string;
    };

    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setError('Only JPG or PNG formats are allowed.');
    } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB}MB.`);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <p className="text-sm text-gray-600">Select a good quality image of this item</p>

      <div className="bg-orange-100 border-l-4 border-orange-400 text-orange-700 px-4 py-2 text-sm rounded">
        Adding images for an item results in up to 3–5% more orders
      </div>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="h-40 border-2 border-dashed border-blue-300 bg-blue-50 rounded-md flex items-center justify-center cursor-pointer"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-full object-contain rounded"
          />
        ) : (
          <div className="text-center text-blue-600 font-semibold">
            <div className="text-3xl mb-1">⬆</div>
            BROWSE
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
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
          <strong>DIMENSIONS</strong>
          <br /> 512px × 512px
        </div>
        <div>
          <strong>MAX SIZE</strong>
          <br /> 3 MB
        </div>
      </div>

      <p className="text-xs text-center text-gray-500">
        Quantity should be same as you serve for dine-in customers
      </p>
    </div>
  );
};

export default ImageSelector;
