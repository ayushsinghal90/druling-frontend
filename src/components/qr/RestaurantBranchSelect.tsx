import React from "react";
import { ChevronDown } from "lucide-react";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { Restaurant, Branch } from "../../types";

interface RestaurantBranchSelectProps {
  onSelect: (restaurant: Restaurant, branch: Branch) => void;
  selectedRestaurant?: Restaurant | null;
  selectedBranch?: Branch | null;
}

const RestaurantBranchSelect = ({
  onSelect,
  selectedRestaurant: propSelectedRestaurant,
  selectedBranch: propSelectedBranch,
}: RestaurantBranchSelectProps) => {
  const { restaurants } = useRestaurant();
  const [selectedRestaurant, setSelectedRestaurant] =
    React.useState<Restaurant | null>(propSelectedRestaurant || null);
  const [selectedBranch, setSelectedBranch] = React.useState<Branch | null>(
    propSelectedBranch || null
  );
  const [isRestaurantOpen, setIsRestaurantOpen] = React.useState(false);
  const [isBranchOpen, setIsBranchOpen] = React.useState(false);

  React.useEffect(() => {
    if (propSelectedRestaurant) {
      setSelectedRestaurant(propSelectedRestaurant);
    }
    if (propSelectedBranch) {
      setSelectedBranch(propSelectedBranch);
    }
  }, [propSelectedRestaurant, propSelectedBranch]);

  const handleRestaurantChange = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedBranch(null);
    setIsRestaurantOpen(false);
  };

  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsBranchOpen(false);
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
          <div
            className="relative inline-block w-full cursor-pointer"
            onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
          >
            <div
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              {selectedRestaurant
                ? selectedRestaurant.name
                : "Select a restaurant"}
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {isRestaurantOpen && (
            <div
              className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <div className="py-1">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRestaurantChange(restaurant)}
                  >
                    {restaurant.name}
                  </div>
                ))}
              </div>
            </div>
          )}
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
            <div
              className="relative inline-block w-full cursor-pointer"
              onClick={() => setIsBranchOpen(!isBranchOpen)}
            >
              <div
                className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                {selectedBranch ? selectedBranch.name : "Select a branch"}
              </div>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {isBranchOpen && (
              <div
                className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                <div className="py-1">
                  {selectedRestaurant.branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleBranchChange(branch)}
                    >
                      {branch.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedRestaurant || !selectedBranch}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RestaurantBranchSelect;
