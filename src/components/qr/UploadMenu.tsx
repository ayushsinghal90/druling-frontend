import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Restaurant, Branch } from "../../types/restaurants";

interface UploadMenuProps {
  restaurant: Restaurant;
  branch: Branch;
  onUpload: (file: File) => void;
}

const UploadMenu = ({ restaurant, branch, onUpload }: UploadMenuProps) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setTimeout(() => {
          setIsUploading(false);
          onUpload(file);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Upload Menu</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload the menu image for{" "}
          <span className="font-semibold text-gray-900">
            {restaurant.name}{" "}
          </span>
          <span>-</span>
          <span className="font-semibold text-gray-600"> {branch.name}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <label className="block">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors duration-200">
              <div className="space-y-1 text-center">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Menu preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>

      {!previewImage && (
        <div className="flex justify-end">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <Upload className="h-4 w-4 mr-2" />
            Select File
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadMenu;
