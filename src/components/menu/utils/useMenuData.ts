import { useState, useEffect } from "react";
import { MenuData } from "../../../types";

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
          files: [
            {
              id: "1",
              file_url: "/src/assets/img/food.png",
              category: "Main Course",
              order: 1,
            },
            {
              id: "2",
              file_url: "/src/assets/img/drinks.png",
              category: "Beverages",
              order: 2,
            },
            {
              id: "3",
              file_url: "/src/assets/img/desserts.png",
              category: "Desserts",
              order: 3,
            },
          ],
          branch: {
            id: "1",
            name: "Downtown Branch",
            contact_info: {
              id: "1",
              phone_number: "+1234567890",
              email: "test@gmail.com",
              social_contacts: {
                id: "1",
                facebook: "https://facebook.com/finediner",
                instagram: "https://instagram.com/finediner",
                x_link: "https://twitter.com/finediner",
                website: "https://finediner.com",
              },
            },
            // image_url:
            //   "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop",
            restaurant: {
              id: "1",
              name: "The Fine Diner",
              image_url:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop",
            },
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
