import React, { useState, useRef, useCallback, useEffect } from "react";
import { Image as ImageIcon, GripHorizontal } from "lucide-react";
import { Restaurant, Branch } from "../../types";

interface UploadMenuProps {
  restaurant: Restaurant;
  branch: Branch;
  onUpload: (files: File[]) => void;
}

interface ImageData {
  file: File;
  preview: string;
  label: string;
  order: number; // New property
}

const Item = ({
  image,
  index,
  handleLabelChange,
  removeImage,
}: {
  image: ImageData;
  index: number;
  handleLabelChange: (imageIndex: number, label: string) => void;
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
        className="w-full h-32 rounded-lg"
      />
      <span className="absolute top-1 left-1 bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
        {index + 1}
      </span>
      <input
        type="text"
        placeholder="Add a label"
        value={image.label}
        onChange={(e) => handleLabelChange(index, e.target.value)}
        className="mt-2 block w-full text-sm text-gray-600 focus:outline-none"
      />
      <button
        onClick={() => removeImage(index)}
        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1"
      >
        X
      </button>
    </div>
  );
};

const UploadMenu = ({ restaurant, branch, onUpload }: UploadMenuProps) => {
  const [images, setImages] = useState<ImageData[]>([{} as ImageData]);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);
  const [sourceIndex, setSourceIndex] = useState<number | null>(null);

  const allowMoreSpots = useCallback(() => {
    if (
      images.length === 0 ||
      images.filter((img) => img.file).length === images.length
    ) {
      setImages((prevImages) => [...prevImages, {} as ImageData]);
    }
  }, [images]);

  useEffect(() => {
    allowMoreSpots();
  }, [images, allowMoreSpots]);

  const processFiles = useCallback(
    async (files: File[]) => {
      const validFiles = Array.from(files).filter(
        (file) => file.size <= 2 * 1024 * 1024
      );

      if (validFiles.length !== files.length) {
        alert("Some files were too large and were not added.");
      }

      const imageData = await Promise.all(
        validFiles.map(
          (file, index) =>
            new Promise<ImageData>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  file,
                  preview: reader.result as string,
                  label: "",
                  order: images.length + index,
                });
              };
              reader.readAsDataURL(file);
            })
        )
      );

      setImages((prevImages) => {
        const filled = prevImages.filter((img) => img.file);
        const newImages = [...filled, ...imageData];
        return newImages;
      });
    },
    [images]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const handleDrop = async (index: number) => {
    if (
      sourceIndex !== null &&
      images[sourceIndex].file &&
      images[index].file
    ) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        [newImages[sourceIndex], newImages[index]] = [
          newImages[index],
          newImages[sourceIndex],
        ];
        return newImages.map((img, idx) => ({ ...img, order: idx }));
      });
    }
    setSourceIndex(null);
  };

  const removeImage = (imageIndex: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, iIdx) => iIdx !== imageIndex)
    );
    allowMoreSpots();
  };

  const handleLabelChange = (imageIndex: number, label: string) => {
    setImages((prevImages) =>
      prevImages.map((img, iIdx) =>
        iIdx === imageIndex ? { ...img, label } : img
      )
    );
  };

  const handleContinue = () => {
    const allFiles = images
      .filter((img) => img.file)
      .map((image) => image.file);
    onUpload(allFiles);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Upload Menu</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload the menu images for{" "}
          <span className="font-semibold text-gray-900">
            {restaurant.name}{" "}
          </span>
          <span>-</span>
          <span className="font-semibold text-gray-600"> {branch.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full max-w-lg"
            onDragOver={(e) => e.preventDefault()}
            onDragStart={() => setSourceIndex(index)}
            onDrop={() => handleDrop(index)}
          >
            <label className="block">
              <div className="mt-1 flex justify-center p-5 bg-white border-1 rounded-lg shadow-lg  border-gray-300 cursor-pointer transition-colors duration-200">
                <div className="space-y-1 text-center">
                  {image.file ? (
                    <Item
                      key={index.toString()}
                      index={index}
                      image={image}
                      handleLabelChange={handleLabelChange}
                      removeImage={removeImage}
                    />
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-32 w-full text-gray-100" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload files</span>
                          <input
                            ref={(el) => (fileInputRefs.current[index] = el!)}
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 2MB each
                      </p>
                    </>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleContinue}
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UploadMenu;
