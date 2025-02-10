import React from "react";
import { GripHorizontal } from "lucide-react";
import { ImageData } from "./utils/ImageData";

const UploadMenuItem = ({
  image,
  index,
  handleCategoryChange,
  removeImage,
}: {
  image: ImageData;
  index: number;
  handleCategoryChange: (imageIndex: number, category: string) => void;
  removeImage: (imageIndex: number) => void;
}) => {
  return (
    <div className="relative p-2">
      <div className="absolute top-2 left-2 cursor-grab">
        <GripHorizontal className="w-4 h-4 text-gray-400" />
      </div>
      <img
        src={image.preview}
        alt={`Menu preview ${index}`}
        id={index.toString()}
        className="w-full h-52 rounded-lg"
      />
      <span className="absolute top-1 left-1 bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
        {index + 1}
      </span>
      <input
        type="text"
        placeholder="Add a category"
        required={true}
        value={image.category}
        onChange={(e) => handleCategoryChange(index, e.target.value)}
        className="mt-2 block w-full text-sm text-gray-600 focus:outline-none"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          removeImage(index);
        }}
        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1"
      >
        X
      </button>
    </div>
  );
};

export default UploadMenuItem;
