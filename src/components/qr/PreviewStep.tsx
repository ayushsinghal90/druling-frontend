import React from "react";
import { Smartphone, Download, Share2 } from "lucide-react";
import { Restaurant, Branch } from "../../types/restaurant";

interface PreviewStepProps {
  restaurant: Restaurant;
  branch: Branch;
  menuImage: string;
  onSubmit: () => void;
  onBack: () => void;
}

const PreviewStep = ({
  restaurant,
  branch,
  menuImage,
  onSubmit,
  onBack,
}: PreviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">
          Preview Your Digital Menu
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Here's how your menu will look on mobile devices
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-[320px]">
          {/* Phone Frame */}
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
              {/* Menu Content */}
              <div className="w-full h-full flex flex-col">
                <div className="bg-gray-100 px-4 py-2">
                  <h4 className="font-medium text-gray-900">
                    {restaurant.name}
                  </h4>
                  <p className="text-sm text-gray-500">{branch.name}</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <img
                    src={menuImage}
                    alt="Menu preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 space-y-4">
            <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
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
