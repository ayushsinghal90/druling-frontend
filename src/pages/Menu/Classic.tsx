import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Logo from "../../components/Logo";
import { MenuData } from "../../types/menu";

const ClassicMenu = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [menuData, setMenuData] = useState<MenuData | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMenuData({
          id: menuId || "",
          title: "Restaurant Menu",
          images: [
            {
              id: 1,
              url: "https://images.unsplash.com/photo-1483918793747-5adbf82956c4",
              title: "Main Course",
              order: 1,
            },
            {
              id: 2,
              url: "https://images.unsplash.com/photo-1572715376701-98568319fd0b",
              title: "Beverages",
              order: 2,
            },
            {
              id: 3,
              url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
              title: "Desserts",
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
      <div className="min-h-screen bg-[#f9f6f2] flex items-center justify-center">
        <div className="text-center">
          <Logo className="h-12 w-12 mx-auto mb-4 text-[#8b4513] animate-pulse" />
          <p className="text-[#8b4513] font-serif">Loading menu...</p>
        </div>
      </div>
    );
  }

  const currentImage = menuData.images[currentImageIndex];

  return (
    <div className="min-h-screen bg-[#f9f6f2]">
      {/* Header with elegant border and serif font */}
      <header className="bg-white border-b-4 border-double border-[#8b4513]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-12 w-12 text-[#8b4513]" />
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
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 space-y-6">
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
              src={currentImage.url}
              alt={currentImage.title}
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
