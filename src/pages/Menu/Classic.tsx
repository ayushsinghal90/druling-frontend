import React from "react";
import { MenuProps } from "./utils/MenuTypes";
import { useMenuControls } from "./utils/useMenuControls";
import MenuHeader from "../../components/menu/MenuHeader";
import MenuFooter from "../../components/menu/MenuFooter";

const ClassicMenu = ({ menuData }: MenuProps) => {
  const { currentImageIndex, setCurrentImageIndex, currentImage } =
    useMenuControls(menuData);

  return (
    <div className="min-h-screen bg-[#f9f6f2] flex flex-col">
      <MenuHeader
        restaurantName={menuData.restaurant.name}
        branchName={menuData.branch.name}
        imageUrl={menuData.restaurant.imageUrl}
        variant="classic"
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16">
        <div className="relative bg-white rounded-lg shadow-xl p-12 border-8 border-double border-[#8b4513]">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8b4513] -translate-x-2 -translate-y-2" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8b4513] translate-x-2 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8b4513] -translate-x-2 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8b4513] translate-x-2 translate-y-2" />

          {/* Menu Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="w-full h-auto transition-transform duration-300"
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

      <MenuFooter
        socialLinks={menuData.restaurant.socialLinks}
        variant="classic"
      />
    </div>
  );
};

export default ClassicMenu;
