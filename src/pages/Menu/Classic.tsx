import React from "react";
import Logo from "../../components/Logo";
import { ZoomIn, ZoomOut } from "lucide-react";
import { MenuProps } from "./utils/MenuTypes";
import { useMenuControls } from "./utils/useMenuControls";

const ClassicMenu = ({ menuData }: MenuProps) => {
  const {
    currentImageIndex,
    setCurrentImageIndex,
    zoom,
    currentImage,
    handleZoomIn,
    handleZoomOut,
  } = useMenuControls(menuData);

  return (
    <div className="min-h-screen bg-[#f9f6f2]">
      {/* Header with elegant border and serif font */}
      <header className="bg-white border-b-4 border-double border-[#8b4513]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            <Logo color="text-black" textSize="text-2xl" />
            <h1 className="mt-6 text-3xl font-serif text-[#8b4513] tracking-wide">
              {menuData.restaurant.name}
            </h1>
            <div className="mt-2 h-0.5 w-24 bg-[#8b4513]" />
            <p className="mt-4 text-lg text-[#8b4513] font-serif italic">
              {menuData.branch.name}
            </p>
          </div>
        </div>
      </header>

      {/* Menu Content with decorative frame */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="relative bg-white rounded-lg shadow-xl p-12 border-8 border-double border-[#8b4513]">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8b4513] -translate-x-2 -translate-y-2" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8b4513] translate-x-2 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8b4513] -translate-x-2 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8b4513] translate-x-2 translate-y-2" />

          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 space-y-6">
            <button
              onClick={handleZoomOut}
              className="p-4 bg-white rounded-full shadow-lg text-[#8b4513] hover:bg-[#f9f6f2] transition-colors duration-200 border border-[#8b4513]"
            >
              <ZoomOut className="h-6 w-6" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-4 bg-white rounded-full shadow-lg text-[#8b4513] hover:bg-[#f9f6f2] transition-colors duration-200 border border-[#8b4513]"
            >
              <ZoomIn className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="w-full h-auto transition-transform duration-300"
              style={{ transform: `scale(${zoom / 100})` }}
            />
          </div>

          {/* Image Navigation */}
          {menuData.images.length > 1 && (
            <div className="mt-12 flex justify-center gap-8">
              {menuData.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`group relative p-4 ${
                    index === currentImageIndex
                      ? "bg-[#f9f6f2]"
                      : "hover:bg-[#f9f6f2]"
                  } rounded-lg transition-colors duration-200`}
                >
                  <div
                    className={`overflow-hidden rounded-lg border-4 ${
                      index === currentImageIndex
                        ? "border-[#8b4513]"
                        : "border-transparent group-hover:border-[#8b4513]/50"
                    } transition-colors duration-200`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                  <span className="mt-4 block text-sm font-serif text-[#8b4513] text-center">
                    {image.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClassicMenu;
