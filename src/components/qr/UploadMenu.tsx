import React, {
  useState,
  useRef,
  DragEvent,
  useCallback,
  useEffect,
} from "react";
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

const SortableItem = ({
  id,
  image,
  index,
  handleLabelChange,
  removeImage,
}: {
  id: string;
  image: ImageData;
  index: number;
  handleLabelChange: (imageIndex: number, label: string) => void;
  removeImage: (imageIndex: number) => void;
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
  const [isDragging, setIsDragging] = useState(false);
  const [allowMore, setAllowMore] = useState(false);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const allowMoreSpots = useCallback(() => {
    if (
      images.length > 0 &&
      images.filter((img) => img.file).length < images.length
    ) {
      setAllowMore(false);
    } else {
      setAllowMore(true);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceIndex = parseInt(active.id);
    const destIndex = parseInt(over.id);

    setImages((prevImages) => {
      const newImages = arrayMove(prevImages, sourceIndex, destIndex);
      return newImages.map((img, idx) => ({ ...img, order: idx }));
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="w-full max-w-lg">
              <label className="block">
                <div
                  className={`mt-1 flex justify-center p-5 bg-white border-1 rounded-lg shadow-lg ${
                    isDragging
                      ? "bg-gray-500 border-gray-400"
                      : "border-gray-300"
                  }  rounded-lg cursor-pointer transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-1 text-center">
                    {image.file ? (
                      <SortableContext
                        items={images.map((_, idx) => idx.toString())}
                        strategy={verticalListSortingStrategy}
                      >
                        <SortableItem
                          key={index.toString()}
                          id={index.toString()}
                          index={index}
                          image={image}
                          handleLabelChange={handleLabelChange}
                          removeImage={removeImage}
                        />
                      </SortableContext>
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
      </DndContext>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            setImages((prevImages) => [...prevImages, {} as ImageData]);
          }}
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
