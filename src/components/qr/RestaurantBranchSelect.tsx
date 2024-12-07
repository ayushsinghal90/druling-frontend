import React, { useState } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { Restaurant, Branch } from "../../types/restaurant";

interface RestaurantBranchSelectProps {
  onSelect: (restaurant: Restaurant, branch: Branch) => void;
  initialRestaurantId?: string | null;
  initialBranchId?: string | null;
}

const RestaurantBranchSelect = ({
  onSelect,
  initialRestaurantId,
  initialBranchId,
}: RestaurantBranchSelectProps) => {
  const { restaurants } = useRestaurant();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const handleRestaurantChange = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedBranch(null);
  };

  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  const handleContinue = () => {
    if (selectedRestaurant && selectedBranch) {
      onSelect(selectedRestaurant, selectedBranch);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="restaurant"
          className="block text-sm font-medium text-gray-700"
        >
          Select Restaurant
        </label>
        <div className="mt-1 relative">
          <select
            id="restaurant"
            value={selectedRestaurant?.id || ""}
            onChange={(e) => {
              const restaurant = restaurants.find(
                (r) => r.id === Number(e.target.value)
              );
              if (restaurant) handleRestaurantChange(restaurant);
            }}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {selectedRestaurant && (
        <div>
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Select Branch
          </label>
          <div className="mt-1 relative">
            <select
              id="branch"
              value={selectedBranch?.id || ""}
              onChange={(e) => {
                const branch = selectedRestaurant.branches.find(
                  (b) => b.id === Number(e.target.value)
                );
                if (branch) handleBranchChange(branch);
              }}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            >
              <option value="">Select a branch</option>
              {selectedRestaurant.branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedRestaurant || !selectedBranch}
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RestaurantBranchSelect;
