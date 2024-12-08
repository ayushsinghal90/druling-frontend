import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MenuProps } from "./utils/MenuTypes";
import { useMenuControls } from "./utils/useMenuControls";
import MenuHeader from "../../components/menu/MenuHeader";
import MenuFooter from "../../components/menu/MenuFooter";

const DefaultMenu = ({ menuData }: MenuProps) => {
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
        restaurantName={menuData.restaurant.name}
        branchName={menuData.branch.name}
        imageUrl={menuData.restaurant.imageUrl}
        variant="default"
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Navigation Buttons */}
          {menuData.images.length > 1 && (
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
            <div
              className="relative rounded-lg overflow-hidden bg-white shadow-lg transition-transform duration-300"
              style={{ maxWidth: "90vw" }}
            >
              <img
                src={currentImage?.url}
                alt={currentImage?.title}
                className="w-full h-auto transition-transform duration-300"
              />
            </div>
          </div>

          {/* Image Pagination */}
          {menuData.images.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {menuData.images.map((image, index) => (
                <button
                  key={image.id}
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
            {currentImage?.title}
          </h2>
        </div>
      </main>

      <MenuFooter
        socialLinks={menuData.restaurant.socialLinks}
        variant="default"
      />
    </div>
  );
};

export default DefaultMenu;
