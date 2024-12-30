import React, { useState, useEffect } from "react";
import { MenuTypes } from "./utils/MenuTypes";

interface RestaurantHeaderProps {
  restaurantName: string;
  branchName: string;
  imageUrl?: string;
  showMenu?: boolean;
  onToggleMenu?: () => void;
  variant?: MenuTypes;
}

const RestaurantHeader = ({
  restaurantName,
  branchName,
  imageUrl,
  variant = MenuTypes.DEFAULT,
}: RestaurantHeaderProps) => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > 55) {
          setShowImage(false);
        } else if (window.scrollY < 45) {
          setShowImage(true);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const styles = {
    default: {
      wrapper: "bg-white shadow-sm",
      container: "text-gray-900",
      subtitle: "text-gray-500",
      button: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      menuButton: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      logo: "text-black",
    },
    modern: {
      wrapper: "bg-[#111]/90 backdrop-blur-xl border-b border-[#333]",
      container: "text-[#00ff9d]",
      subtitle: "text-[#00ff9d]/60",
      button: "text-[#00ff9d]/60 hover:text-[#00ff9d]",
      menuButton: "text-[#00ff9d]/60 hover:text-[#00ff9d] bg-[#222]/50",
      logo: "text-[#00ff9d]",
    },
    scrolling: {
      wrapper: "bg-[#1a1a1a] border-b border-amber-500/20",
      container: "text-amber-500",
      subtitle: "text-amber-500/60",
      button: "text-amber-500/60 hover:text-amber-500 hover:bg-[#2a2a2a]",
      menuButton: "text-amber-500/60 hover:text-amber-500 hover:bg-[#2a2a2a]",
      logo: "text-amber-500",
    },
  };

  const style = styles[variant];

  return (
    <header className={`${style.wrapper} sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative flex flex-col items-center">
          {/* Restaurant Image */}
          {imageUrl && showImage && (
            <div className="w-16 h-16 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img
                src={imageUrl}
                alt={restaurantName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Restaurant Info */}
          <div className="text-center mb-2">
            <h1
              className={`text-lg md:text-xl font-semibold ${style.container}`}
            >
              {restaurantName}
            </h1>
            <p className={`text-sm mt-1 ${style.subtitle}`}>{branchName}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;
