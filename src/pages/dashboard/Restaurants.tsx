import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import RestaurantList from "../../components/restaurants/RestaurantList";
import { RestaurantProvider } from "../../contexts/RestaurantContext";

const Restaurants = () => {
  return (
    <DashboardLayout>
      <RestaurantProvider>
        <div className="space-y-8">
          <RestaurantList />
        </div>
      </RestaurantProvider>
    </DashboardLayout>
  );
};

export default Restaurants;
