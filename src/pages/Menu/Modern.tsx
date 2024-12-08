import React, { useState } from "react";
import {
  Menu as MenuIcon,
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Logo from "../../components/Logo";
import { MenuProps } from "./utils/MenuTypes";
import { useMenuControls } from "./utils/useMenuControls";

const ModernMenu = ({ menuData }: MenuProps) => {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const {
    currentImageIndex,
    setCurrentImageIndex,
    zoom,
    currentImage,
    handlePrevImage,
    handleNextImage,
    handleZoomIn,
    handleZoomOut,
  } = useMenuControls(menuData);

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111]/90 backdrop-blur-xl border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Logo color="text-white" textSize="text-2xl" />
              <div>
                <h1 className="text-lg font-mono text-[#00ff9d]">
                  {menuData.restaurant.name}
                </h1>
                <p className="text-sm text-[#00ff9d]/60 font-mono">
                  {menuData.branch.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-[#222] rounded-full p-1.5">
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors duration-200"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-sm text-[#00ff9d]/60 font-mono min-w-[3ch] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors duration-200"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="p-2 text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors duration-200"
              >
                {showThumbnails ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="pt-20 pb-8">
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden border border-[#333] bg-[#222]">
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="w-full h-auto transition-transform duration-300"
              style={{ transform: `scale(${zoom / 100})` }}
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

          {/* Thumbnails Panel */}
          <div
            className={`fixed inset-y-0 right-0 w-80 bg-[#111]/90 backdrop-blur-xl border-l border-[#333] transform transition-transform duration-300 ease-in-out ${
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
                        src={image.url}
                        alt={image.title}
                        className="w-full h-40 object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 border-2 border-[#00ff9d]" />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-mono text-[#00ff9d]">
                      {image.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModernMenu;
