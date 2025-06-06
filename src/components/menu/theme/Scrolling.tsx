import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { MenuProps } from "../utils/MenuProps";
import MenuHeader from "../MenuHeader";
import MenuFooter from "../MenuFooter";
import { MenuTypes } from "../utils/MenuTypes";

const ScrollingMenu = ({ menuData }: MenuProps) => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(false);

  const updateScrollButtons = () => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;

    setShowUpButton(scrollY > 0);
    setShowDownButton(scrollY + innerHeight < scrollHeight);
  };

  useEffect(() => {
    updateScrollButtons(); // Initial button state
    window.addEventListener("scroll", updateScrollButtons);

    return () => {
      window.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  const handleScroll = (direction: string) => {
    const scrollAmount = 150; // Adjust scroll amount as needed
    const newScrollPosition =
      direction === "up"
        ? window.scrollY - scrollAmount
        : window.scrollY + scrollAmount;

    window.scrollTo({
      top: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      <MenuHeader
        restaurantName={menuData?.branch?.restaurant?.name || ""}
        branchName={menuData?.branch?.name || ""}
        imageUrl={menuData?.branch?.restaurant?.img_url || ""}
        variant={MenuTypes.SCROLLING}
      />

      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {menuData?.files?.map((file) => (
            <div
              key={file.id}
              className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="p-6 border-b border-amber-500/20">
                <h2 className="text-xl font-medium text-amber-500">
                  {file.category}
                </h2>
              </div>
              <div className="relative">
                <img
                  src={file.file_url}
                  alt={file.category}
                  className="w-full h-auto transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Scroll Buttons */}
        {showUpButton && (
          <button
            onClick={() => handleScroll("up")}
            className="fixed left-1/2 top-56 z-20 -translate-x-1/2 p-3 bg-amber-500 text-[#1a1a1a] rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-amber-400"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        )}
        {showDownButton && (
          <button
            onClick={() => handleScroll("down")}
            className="fixed left-1/2 bottom-56 -translate-x-1/2 p-3 bg-amber-500 text-[#1a1a1a] rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-amber-400"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        )}
      </div>

      <MenuFooter
        socialContacts={menuData?.branch?.contact_info?.social_contacts}
        variant={MenuTypes.SCROLLING}
      />
    </div>
  );
};

export default ScrollingMenu;
