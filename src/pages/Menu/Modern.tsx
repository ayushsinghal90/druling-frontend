import React, { useState } from "react";
import { Menu as MenuIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { MenuProps } from "./utils/MenuTypes";
import { useMenuControls } from "./utils/useMenuControls";
import MenuHeader from "../../components/menu/MenuHeader";
import MenuFooter from "../../components/menu/MenuFooter";

const ModernMenu = ({ menuData }: MenuProps) => {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const {
    currentImageIndex,
    setCurrentImageIndex,
    handlePrevImage,
    handleNextImage,
    currentImage,
  } = useMenuControls(menuData);

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col">
      <MenuHeader
        restaurantName={menuData.restaurant.name}
        branchName={menuData.branch.name}
        imageUrl={menuData.restaurant.imageUrl}
        variant="modern"
      />

      <main className="flex-1 pt-8 pb-8">
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden border border-[#333] bg-[#222]">
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="w-full h-auto transition-transform duration-300"
            />

            {/* Navigation Arrows */}
            {menuData.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-[#111]/90 backdrop-blur-xl rounded-full text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors duration-200 border border-[#333]"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#111]/90 backdrop-blur-xl rounded-full text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors duration-200 border border-[#333]"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Page Title */}
          <div className="mt-6 text-center">
            <h2 className="text-xl font-mono text-[#00ff9d]">
              {currentImage?.title}
            </h2>
          </div>

          {/* Thumbnails Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="fixed top-4 right-4 z-50 p-2 bg-[#111]/90 backdrop-blur-xl rounded-full text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors duration-200 border border-[#333]"
          >
            {showThumbnails ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>

          {/* Thumbnails Panel */}
          <div
            className={`fixed inset-y-0 right-0 z-30 w-80 bg-[#111]/90 backdrop-blur-xl border-l border-[#333] transform transition-transform duration-300 ease-in-out ${
              showThumbnails ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6">
              <h3 className="text-sm font-mono text-[#00ff9d]/60 mb-6">
                Menu Pages
              </h3>
              <div className="space-y-6">
                {menuData.images.map((image, index) => (
                  <button
                    key={image.id}
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
                        src={image.file_url}
                        alt={image.category}
                        className="w-full h-40 object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 border-2 border-[#00ff9d]" />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-mono text-[#00ff9d]">
                      {image.category}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MenuFooter
        socialContacts={menuData?.branch.contact_info?.social_contacts}
        variant="modern"
      />
    </div>
  );
};

export default ModernMenu;
