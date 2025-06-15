import { useSnackbar } from "notistack";
import { useState } from "react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  acceptedFormats?: string;
  maxFileSize?: number;
  label?: string;
  description?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  acceptedFormats = "image/png,image/jpeg,application/pdf",
  maxFileSize = 1000,
  label = "Click to upload",
  description = "PNG, JPG or PDF (MAX. 1MB)",
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      if (file.size / 1024 > maxFileSize) {
        enqueueSnackbar(
          `File size exceeds the maximum limit of ${maxFileSize}KB.`,
          {
            variant: "warning",
            className: "font-poppins",
          }
        );
        setFileName(null);
        onFileChange(null);
        return;
      }

      if (!acceptedFormats.split(",").includes(file.type)) {
        enqueueSnackbar("Invalid file type. Please upload a valid file.", {
          variant: "warning",
          className: "font-poppins",
        });
        setFileName(null);
        onFileChange(null);
        return;
      }

      setFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        {fileName ? (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{fileName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept={acceptedFormats}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
