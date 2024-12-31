import React, { useState, useRef, useCallback, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Restaurant, Branch } from "../../types";
import { ImageData } from "./utils/ImageData";
import { validateFile } from "./utils/useValidateFile";
import UploadMenuItem from "./UploadMenuItem";

interface UploadMenuProps {
  restaurant: Restaurant;
  branch: Branch;
  imagesData: ImageData[];
  onUpload: (imagesData: ImageData[]) => void;
}

const UploadMenu = ({
  restaurant,
  branch,
  imagesData,
  onUpload,
}: UploadMenuProps) => {
  const [images, setImages] = useState<ImageData[]>(
    imagesData.length > 0 ? imagesData : [{} as ImageData]
  );
  const fileInputRefs = useRef<HTMLInputElement[]>([]);
  const [sourceIndex, setSourceIndex] = useState<number | null>(null);

  const addEmptySpot = useCallback(() => {
    const validFiles = images.filter((img) => img.file);
    if (images.length === 0 || validFiles.length === images.length) {
      setImages([...validFiles, {} as ImageData]);
    }
  }, [images]);

  useEffect(() => {
    addEmptySpot();
  }, [addEmptySpot]);

  const processFiles = useCallback(
    async (files: File[]) => {
      const validFiles = [];
      for (const file of files) {
        if (await validateFile(file)) {
          validFiles.push(file);
        }
      }

      if (validFiles.length !== files.length) {
        alert(
          "Some files either too large or were not in correct ratio and were not added."
        );
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
                  category: "",
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
    addEmptySpot();
  };

  const handleCategoryChange = (imageIndex: number, category: string) => {
    setImages((prevImages) =>
      prevImages.map((img, iIdx) =>
        iIdx === imageIndex ? { ...img, category } : img
      )
    );
  };

  const handleContinue = () => {
    onUpload(
      images
        .map((image) => {
          if (image.file) {
            return image;
          }
          return undefined;
        })
        .filter((image): image is ImageData => image !== undefined)
    );
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
                    <UploadMenuItem
                      key={index.toString()}
                      index={index}
                      image={image}
                      handleCategoryChange={handleCategoryChange}
                      removeImage={removeImage}
                    />
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-52 p-10 w-full text-gray-100" />
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
