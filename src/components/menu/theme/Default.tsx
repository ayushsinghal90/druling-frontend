import React, { useState } from "react";
import { Menu as MenuIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { MenuProps } from "../utils/MenuProps";
import { useMenuControls } from "../utils/useMenuControls";
import MenuHeader from "../MenuHeader";
import MenuFooter from "../MenuFooter";
import { MenuTypes } from "../utils/MenuTypes";

const DefaultMenu = ({ menuData }: MenuProps) => {
  const [showThumbnails, setShowThumbnails] = useState(false);

  const {
    currentImageIndex,
    setCurrentImageIndex,
    currentImage,
    handlePrevImage,
    handleNextImage,
  } = useMenuControls(menuData);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MenuHeader
        restaurantName={menuData?.branch?.restaurant?.name || ""}
        branchName={menuData?.branch.name || ""}
        imageUrl={menuData?.branch?.restaurant?.image_url || ""}
        variant={MenuTypes.DEFAULT}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Navigation Buttons */}
          {(menuData?.files?.length ?? 0) > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Menu Image */}
          <div className="flex justify-center">
            <div className="relative rounded-lg overflow-hidden bg-white shadow-lg transition-transform duration-300 max-w-[80vw]">
              <img
                src={currentImage?.file_url}
                alt={currentImage?.category}
                className="w-full h-auto transition-transform duration-300"
              />
            </div>
          </div>

          {/* Image Pagination */}
          {(menuData?.files?.length ?? 0) > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {menuData?.files.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Menu Title */}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-medium text-gray-900">
            {currentImage?.category}
          </h2>
        </div>

        {/* Thumbnails Toggle */}
        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className="fixed top-4 right-4 z-50 p-2 bg-white backdrop-blur-xl rounded-full text-black hover:text-gray-900 transition-colors duration-200"
        >
          {showThumbnails ? (
            <X className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>

        {/* Thumbnails Panel */}
        <div
          className={`fixed inset-y-0 right-0 w-80 z-40 bg-white backdrop-blur-xl border-l border-[#333] transform transition-transform duration-300 ease-in-out ${
            showThumbnails ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <h3 className="text-sm font-mono text-grey-900 mb-6">Menu Pages</h3>
            <div className="space-y-6">
              {menuData?.files.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowThumbnails(false);
                  }}
                  className={`w-full text-left transition-opacity duration-200 ${
                    index === currentImageIndex
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <div className="relative rounded-lg overflow-hidden border border-[#333] bg-[#222]">
                    <img
                      src={file.file_url}
                      alt={file.category}
                      className="w-full h-40 object-cover"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 border-2 border-grey-400" />
                    )}
                  </div>
                  <p className="mt-3 text-sm font-mono text-black">
                    {file.category}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <MenuFooter
        socialContacts={menuData?.branch.contact_info?.social_contacts}
        variant={MenuTypes.DEFAULT}
      />
    </div>
  );
};

export default DefaultMenu;
