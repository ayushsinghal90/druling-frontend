import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import Logo from "../Logo";

interface RestaurantHeaderProps {
  restaurantName: string;
  branchName: string;
  imageUrl?: string;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  variant?: "default" | "classic" | "modern";
}

const RestaurantHeader = ({
  restaurantName,
  branchName,
  imageUrl,
  zoom,
  onZoomIn,
  onZoomOut,
  variant = "default",
}: RestaurantHeaderProps) => {
  const styles = {
    default: {
      wrapper: "bg-white shadow-sm",
      container: "text-gray-900",
      subtitle: "text-gray-500",
      button: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      logo: "text-black",
    },
    classic: {
      wrapper: "bg-white border-b-4 border-double border-[#8b4513]",
      container: "text-[#8b4513]",
      subtitle: "text-[#8b4513]/70",
      button: "text-[#8b4513]/70 hover:text-[#8b4513] hover:bg-[#f9f6f2]",
      logo: "text-[#8b4513]",
    },
    modern: {
      wrapper: "bg-[#111]/90 backdrop-blur-xl border-b border-[#333]",
      container: "text-[#00ff9d]",
      subtitle: "text-[#00ff9d]/60",
      button: "text-[#00ff9d]/60 hover:text-[#00ff9d]",
      logo: "text-[#00ff9d]",
    },
  };

  const style = styles[variant];

  return (
    <header className={`${style.wrapper}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col items-center">
          {/* Restaurant Image */}
          {imageUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img
                src={imageUrl}
                alt={restaurantName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Restaurant Info */}
          <div className="text-center mb-4">
            <h1 className={`text-xl font-semibold ${style.container}`}>
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
