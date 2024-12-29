import React, { useState, useRef, DragEvent, useCallback } from "react";
import { Upload, Image as ImageIcon, GripHorizontal } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Restaurant, Branch } from "../../types";
import { set } from "zod";

interface UploadMenuProps {
  restaurant: Restaurant;
  branch: Branch;
  onUpload: (files: File[]) => void;
}

interface ImageData {
  file: File;
  preview: string;
  label: string;
}

const SortableItem = ({
  id,
  image,
  index,
  groupIndex,
  handleLabelChange,
  removeImage,
}: {
  id: string;
  image: ImageData;
  index: number;
  groupIndex: number;
  handleLabelChange: (
    groupIndex: number,
    imageIndex: number,
    label: string
  ) => void;
  removeImage: (groupIndex: number, imageIndex: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative p-2">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab"
      >
        <GripHorizontal className="w-4 h-4 text-gray-400" />
      </div>
      <img
        src={image.preview}
        alt={`Menu preview ${index}`}
        className="w-full h-32 rounded-lg"
      />
      <span className="absolute top-1 left-1 bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
        {index + 1}
      </span>
      <input
        type="text"
        placeholder="Add a label"
        value={image.label}
        onChange={(e) => handleLabelChange(groupIndex, index, e.target.value)}
        className="mt-2 block w-full text-sm text-gray-600"
      />
      <button
        onClick={() => removeImage(groupIndex, index)}
        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1"
      >
        X
      </button>
    </div>
  );
};

const UploadMenu = ({ restaurant, branch, onUpload }: UploadMenuProps) => {
  const [imageGroups, setImageGroups] = useState<ImageData[][]>([[]]);
  const [allowMore, setAllowMore] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const allowMoreGroups = () => {
    if (!imageGroups.every((group) => group.length > 0)) {
      setAllowMore(true);
    }
  };

  const processFiles = useCallback(
    async (files: File[], groupIndex: number) => {
      const validFiles = Array.from(files).filter(
        (file) => file.size <= 2 * 1024 * 1024
      );

      if (validFiles.length !== files.length) {
        alert("Some files were too large and were not added.");
      }

      const imageData = await Promise.all(
        validFiles.map(
          (file) =>
            new Promise<ImageData>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({ file, preview: reader.result as string, label: "" });
              };
              reader.readAsDataURL(file);
            })
        )
      );

      setImageGroups((prevGroups) => {
        const newGroups = [...prevGroups];
        newGroups[groupIndex] = [...newGroups[groupIndex], ...imageData];
        return newGroups;
      });
    },
    []
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const [sourceGroupIndex, sourceIndex] = active.id.split("-").map(Number);
    const [destGroupIndex, destIndex] = over.id.split("-").map(Number);

    setImageGroups((prevGroups) => {
      const newGroups = [...prevGroups];
      if (sourceGroupIndex === destGroupIndex) {
        newGroups[sourceGroupIndex] = arrayMove(
          newGroups[sourceGroupIndex],
          sourceIndex,
          destIndex
        );
      } else {
        const [movedItem] = newGroups[sourceGroupIndex].splice(sourceIndex, 1);
        newGroups[destGroupIndex].splice(destIndex, 0, movedItem);
      }
      return newGroups;
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupIndex: number
  ) => {
    const files = Array.from(e.target.files || []);
    processFiles(files, groupIndex);
    allowMoreGroups();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (
    e: DragEvent<HTMLDivElement>,
    groupIndex: number
  ) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files, groupIndex);
  };

  const removeImage = (groupIndex: number, imageIndex: number) => {
    setImageGroups((prevGroups) => {
      const newGroups = prevGroups.map((group, gIdx) =>
        gIdx === groupIndex
          ? group.filter((_, iIdx) => iIdx !== imageIndex)
          : group
      );

      // Ensure only one empty spot
      if (newGroups[groupIndex].length === 0 && newGroups.length > 1) {
        newGroups.splice(groupIndex, 1);
      }

      return newGroups;
    });
  };

  const handleLabelChange = (
    groupIndex: number,
    imageIndex: number,
    label: string
  ) => {
    setImageGroups((prevGroups) =>
      prevGroups.map((group, gIdx) =>
        gIdx === groupIndex
          ? group.map((img, iIdx) =>
              iIdx === imageIndex ? { ...img, label } : img
            )
          : group
      )
    );
  };

  const addImageGroup = () => {
    if (imageGroups.every((group) => group.length > 0)) {
      setImageGroups((prevGroups) => [...prevGroups, []]);
      setAllowMore(false);
    }
  };

  const handleContinue = () => {
    const allFiles = imageGroups.flat().map((image) => image.file);
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          {imageGroups.map((images, groupIndex) => (
            <div key={groupIndex} className="w-full max-w-lg">
              <label className="block">
                <div
                  className={`mt-1 flex justify-center p-5 bg-white border-1 rounded-lg shadow-lg ${
                    isDragging
                      ? "bg-gray-500 border-gray-400"
                      : "border-gray-300"
                  }  rounded-lg cursor-pointer transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, groupIndex)}
                >
                  <div className="space-y-1 text-center">
                    {images.length > 0 ? (
                      <SortableContext
                        items={images.map(
                          (_, index) => `${groupIndex}-${index}`
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        {images.map((image, index) => (
                          <SortableItem
                            key={`${groupIndex}-${index}`}
                            id={`${groupIndex}-${index}`}
                            index={index}
                            image={image}
                            groupIndex={groupIndex}
                            handleLabelChange={handleLabelChange}
                            removeImage={removeImage}
                          />
                        ))}
                      </SortableContext>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-32 w-full text-gray-100" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Upload files</span>
                            <input
                              ref={(el) =>
                                (fileInputRefs.current[groupIndex] = el!)
                              }
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleFileChange(e, groupIndex)}
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
      </DndContext>

      <div className="flex justify-end space-x-4">
        <button
          onClick={addImageGroup}
          disabled={!allowMore}
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-200"
        >
          <Upload className="h-4 w-4 mr-2" />
          Add More Images
        </button>
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
