import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Logo from "../../components/Logo";
import { MenuData } from "../../types/menu";

const DefaultMenu = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [menuData, setMenuData] = useState<MenuData | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Mock API call - replace with actual API integration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMenuData({
          id: menuId || "",
          title: "Restaurant Menu",
          images: [
            {
              id: 1,
              url: "https://images.unsplash.com/photo-1483918793747-5adbf82956c4",
              title: "Main Menu",
              order: 1,
            },
            {
              id: 2,
              url: "https://images.unsplash.com/photo-1572715376701-98568319fd0b",
              title: "Drinks Menu",
              order: 2,
            },
            {
              id: 3,
              url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
              title: "Dessert Menu",
              order: 3,
            },
          ],
          restaurant: {
            id: 1,
            name: "The Fine Diner",
          },
          branch: {
            id: 1,
            name: "Downtown Branch",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };

    if (menuId) {
      fetchMenuData();
    }
  }, [menuId]);

  const handlePrevImage = () => {
    if (!menuData) return;
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : menuData.images.length - 1
    );
  };

  const handleNextImage = () => {
    if (!menuData) return;
    setCurrentImageIndex((prev) =>
      prev < menuData.images.length - 1 ? prev + 1 : 0
    );
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  if (loading || !menuData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Logo className="h-12 w-12 mx-auto mb-4 text-black animate-pulse" />
          <p className="text-gray-500">Loading menu...</p>
        </div>
      </div>
    );
  }

  const currentImage = menuData.images[currentImageIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Logo className="h-8 w-8 text-black" />
              <div className="ml-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  {menuData.restaurant.name}
                </h1>
                <p className="text-sm text-gray-500">{menuData.branch.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-600">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Navigation Buttons */}
          {menuData.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
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
                src={currentImage.url}
                alt={currentImage.title}
                className="w-full h-auto transition-transform duration-300"
                style={{ transform: `scale(${zoom / 100})` }}
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
            {currentImage.title}
          </h2>
        </div>
      </main>
    </div>
  );
};

export default DefaultMenu;
