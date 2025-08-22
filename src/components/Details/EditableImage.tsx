"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";
import { uploadDocuments } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import { Edit, X, Check } from "lucide-react";

interface EditableImageProps {
  imageUrl: string | null;
  onImageUpdate?: (newImageUrl: string) => void;
  alt?: string;
  className?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  imageUrl,
  onImageUpdate,
  alt = "Restaurant Image",
  className = ""
}) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleImageClick = () => {
    setShowEditIcon(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      enqueueSnackbar("Please select an image file", {
        variant: "warning",
        className: "font-poppins",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      enqueueSnackbar("File size should be less than 5MB", {
        variant: "warning",
        className: "font-poppins",
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", "image");

      const response = await uploadDocuments(formData);

      if (response?.documentUrl) {
        enqueueSnackbar("Image uploaded successfully", {
          variant: "success",
          className: "font-poppins",
        });
        
        // Call the callback to update the parent component
        if (onImageUpdate) {
          onImageUpdate(response.documentUrl);
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      enqueueSnackbar("Failed to upload image. Please try again.", {
        variant: "error",
        className: "font-poppins",
      });
    } finally {
      setIsUploading(false);
      setShowEditIcon(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditIcon(false);
  };

  return (
    <div 
      className={`relative cursor-pointer group ${className}`}
      onClick={handleImageClick}
      onMouseLeave={() => setShowEditIcon(false)}
    >
      <Image
        src={imageUrl || `${S3_BASE_URL}/public/settings_sheet_image.jpg`}
        alt={alt}
        width={1000}
        height={1000}
        className="rounded-3xl w-full h-full object-cover"
      />
      
      {/* Edit Icon Overlay */}
      {showEditIcon && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl flex items-center justify-center">
          <div className="flex gap-4">
            <button
              onClick={handleEditClick}
              disabled={isUploading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors disabled:opacity-50"
              title="Edit Image"
            >
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Edit size={24} />
              )}
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
              title="Cancel"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default EditableImage;
