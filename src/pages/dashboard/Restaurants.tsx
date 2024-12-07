import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import RestaurantList from "../../components/restaurants/RestaurantList";
import AddRestaurantModal from "../../components/restaurants/AddRestaurantModal";
import { Restaurant } from "../../types/restaurant";

const Restaurants = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock data - replace with actual API calls
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "The Fine Diner",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop",
      branches: [
        {
          id: 1,
          name: "Downtown Branch",
          address: "123 Main St, Downtown",
          phone: "+1 234-567-8900",
          email: "downtown@finediner.com",
          manager: "John Doe",
          menuLink: "https://menu.finediner.com/downtown",
        },
        {
          id: 2,
          name: "Uptown Branch",
          address: "456 Park Ave, Uptown",
          phone: "+1 234-567-8901",
          email: "uptown@finediner.com",
          manager: "Jane Smith",
        },
      ],
    },
    {
      id: 2,
      name: "Café Bistro",
      imageUrl:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop",
      branches: [
        {
          id: 3,
          name: "Waterfront Location",
          address: "789 Beach Rd, Waterfront",
          phone: "+1 234-567-8902",
          email: "waterfront@cafebistro.com",
          manager: "Mike Johnson",
          menuLink: "https://menu.cafebistro.com/waterfront",
        },
      ],
    },
  ];

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
    restaurants[0]
  );

  const handleAddBranch = (restaurantId: number) => {
    console.log("Add branch to restaurant:", restaurantId);
  };

  const handleEditBranch = (restaurantId: number, branchId: number) => {
    console.log("Edit branch:", branchId, "of restaurant:", restaurantId);
  };

  const handleDeleteBranch = (restaurantId: number, branchId: number) => {
    console.log("Delete branch:", branchId, "of restaurant:", restaurantId);
  };

  const handleContactUs = () => {
    console.log("Contact us clicked");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <RestaurantList
          restaurants={restaurants}
          selectedRestaurant={selectedRestaurant}
          onSelectRestaurant={setSelectedRestaurant}
          onAddBranch={handleAddBranch}
          onEditBranch={handleEditBranch}
          onDeleteBranch={handleDeleteBranch}
          onContactUs={handleContactUs}
          onAddRestaurant={() => setIsAddModalOpen(true)}
        />
      </div>

      <AddRestaurantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Restaurants;
