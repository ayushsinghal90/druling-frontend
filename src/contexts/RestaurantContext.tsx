import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../types/restaurants";

interface RestaurantContextType {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  selectRestaurant: (restaurant: Restaurant) => void;
  addBranch: (restaurantId: string) => void;
  editBranch: (restaurantId: string, branchId: string) => void;
  deleteBranch: (restaurantId: string, branchId: string) => void;
  addRestaurant: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: "1",
      name: "The Fine Diner",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop",
      branches: [
        {
          id: "",
          name: "Downtown Branch",
          manager: "John Doe",
          menuLink: "https://menu.finediner.com/downtown",
        },
      ],
    },
    {
      id: "",
      name: "Café Bistro",
      imageUrl:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop",
      branches: [
        {
          id: "",
          name: "Waterfront Location",
          manager: "Mike Johnson",
          menuLink: "https://menu.cafebistro.com/waterfront",
        },
      ],
    },
  ]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(restaurants[0]);

  const selectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const addBranch = (restaurantId: string) => {
    navigate(
      `/restaurants/add?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(
        selectedRestaurant?.name || ""
      )}`
    );
  };

  const editBranch = (restaurantId: string, branchId: string) => {
    navigate(`/restaurants/${restaurantId}/branches/${branchId}/edit`);
  };

  const deleteBranch = (restaurantId: string, branchId: string) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            branches: restaurant.branches.filter(
              (branch) => branch.id !== branchId
            ),
          };
        }
        return restaurant;
      })
    );
  };

  const addRestaurant = () => {
    navigate("/restaurants/add");
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        selectedRestaurant,
        selectRestaurant,
        addBranch,
        editBranch,
        deleteBranch,
        addRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
