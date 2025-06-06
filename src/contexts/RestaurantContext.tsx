import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Restaurant } from "../types";
import { useGetAllRestaurantsQuery } from "../store/services/restaurantApi";
import LoadingScreen from "../components/common/LoadingScreen";

interface RestaurantContextType {
  restaurants: Restaurant[];
  restaurantsExists: boolean;
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
  const location = useLocation();
  const {
    data: restaurantsData,
    isLoading,
    refetch,
  } = useGetAllRestaurantsQuery();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restaurantsExists, setRestaurantsExists] = useState<boolean>(true);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  // Update restaurants state when data is fetched
  useEffect(() => {
    if (restaurantsData?.data) {
      if (restaurantsData.data.length === 0) {
        setRestaurantsExists(false);
      }

      setRestaurants(restaurantsData.data);
      setSelectedRestaurant(restaurantsData.data[0] || null); // Set the first restaurant as selected
    }
  }, [restaurantsData]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

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
            branches: restaurant?.branches?.filter(
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        restaurantsExists,
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
