import React from "react";
import { Restaurant, Branch } from "../../types";
import { menuMap } from "../menu/utils/MenuMap";
import { MenuProps } from "../menu/utils/MenuProps";
import { MenuTypes } from "../menu/utils/MenuTypes";
import { MenuDetails } from "./utils/MenuDetails";

interface PreviewStepProps {
  restaurant: Restaurant;
  branch: Branch;
  menuDetails: MenuDetails;
  onSubmit: () => void;
  onBack: () => void;
}

const PreviewStep = ({
  restaurant,
  branch,
  menuDetails,
  onSubmit,
  onBack,
}: PreviewStepProps) => {
  const menuData: MenuProps = {
    menuData: {
      id: "1",
      branch: {
        ...branch,
        restaurant,
      },
      files: menuDetails.imagesData
        .sort((a, b) => a.order - b.order)
        .map((image) => ({
          id: image.file.name,
          file_url: image.preview,
          order: image.order,
          category: image.category,
        })),
    },
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">
          Preview Your Digital Menu
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Review your menu before publishing and select a theme
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.keys(menuMap).map((key) => {
          return (
            <button
              key={key}
              className="border-1 bg-gray-50 rounded-lg shadow-xl p-4 duration-200 ease-in-out 
              transform hover:scale-105 hover:shadow-2xl
               hover:bg-indigo-300 text-gray-700 hover:text-white focus:bg-indigo-300 focus:text-white"
              onClick={() => {
                localStorage.setItem("menuData", JSON.stringify(menuData));
                window.open(`/menu/preview?theme=${key}`, "_blank");
              }}
              onFocus={() => (menuDetails.theme = key as MenuTypes)}
            >
              <span className="text-sm font-sans font-semibold tracking-wider">
                {key.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
        >
          Publish Menu
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;
