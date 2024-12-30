import { useState } from "react";
import { MenuData } from "../../../types/menu";

export const useMenuControls = (menuData: MenuData | null) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    if (!menuData) return;
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : menuData?.files.length - 1
    );
  };

  const handleNextImage = () => {
    if (!menuData) return;
    setCurrentImageIndex((prev) =>
      prev < menuData?.files.length - 1 ? prev + 1 : 0
    );
  };

  const currentImage = menuData?.files[currentImageIndex];

  return {
    currentImageIndex,
    setCurrentImageIndex,
    currentImage,
    handlePrevImage,
    handleNextImage,
  };
};
