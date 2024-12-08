import { useState, useEffect } from "react";
import { MenuData } from "../../types/menu";

export const useMenuData = (menuId: string | undefined) => {
  const [loading, setLoading] = useState(true);
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
              url: "/src/assets/img/food.png",
              title: "Main Course",
              order: 1,
            },
            {
              id: 2,
              url: "/src/assets/img/drinks.png",
              title: "Beverages",
              order: 2,
            },
            {
              id: 3,
              url: "/src/assets/img/desserts.png",
              title: "Desserts",
              order: 3,
            },
          ],
          restaurant: {
            id: 1,
            name: "The Fine Diner",
            imageUrl:
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop",
            socialLinks: {
              facebook: "https://facebook.com/finediner",
              instagram: "https://instagram.com/finediner",
              twitter: "https://twitter.com/finediner",
              website: "https://finediner.com",
            },
          },
          branch: {
            id: 1,
            name: "Downtown Branch",
            imageUrl:
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop",
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

  return { loading, menuData };
};
