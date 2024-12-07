import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Image, ChevronDown, Pencil, Trash2, Phone } from "lucide-react";
import ContactModal from "./ContactModal";
import DeleteBranchModal from "./DeleteBranchModal";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { Branch } from "../../types/restaurants";

const RestaurantList = () => {
  const navigate = useNavigate();

  const {
    restaurants,
    selectedRestaurant,
    selectRestaurant,
    addBranch,
    editBranch,
    deleteBranch,
    addRestaurant,
  } = useRestaurant();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (
    restaurantId: number,
    branchId: number,
    branchName: string
  ) => {
    setBranchToDelete({ id: branchId, name: branchName });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (branchToDelete && selectedRestaurant) {
      deleteBranch(selectedRestaurant.id, branchToDelete.id);
      setShowDeleteModal(false);
    }
  };

  const handleMenuClick = (branch: Branch) => {
    if (!branch.menuLink) {
      // Navigate to GenerateQR page with restaurant and branch details
      navigate(`/qr/menu/${selectedRestaurant?.id}/${branch.id}`);
    } else {
      window.open(branch.menuLink, "_blank");
    }
  };

  if (!selectedRestaurant) return null;

  return (
    <div className="space-y-6">
      {/* Add Restaurant Button */}
      <div className="flex justify-end">
        <button
          onClick={addRestaurant}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Add Restaurant
        </button>
      </div>

      {selectedRestaurant && (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Restaurant Header */}
          <div className="relative">
            {/* Restaurant Image */}
            <div className="absolute -top-12 left-5 w-24 h-24">
              <div className="w-full h-full rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-50">
                {selectedRestaurant?.imageUrl ? (
                  <img
                    src={selectedRestaurant.imageUrl}
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6 border-b border-gray-100/75">
              <div className="flex flex-row md:items-center justify-between gap-4">
                <div className="flex items-center ml-32">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="group flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-200"
                    >
                      {selectedRestaurant?.name}
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-10">
                        {restaurants.map((restaurant) => (
                          <button
                            key={restaurant.id}
                            onClick={() => {
                              selectRestaurant(restaurant);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="w-8 h-8 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                              {restaurant.imageUrl ? (
                                <img
                                  src={restaurant.imageUrl}
                                  alt={restaurant.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Image className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {restaurant.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Us Button - Desktop */}
                <button
                  onClick={() => setShowContactModal(true)}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Contact Us
                </button>

                {/* Contact Us Button - Mobile */}
                <button
                  onClick={() => setShowContactModal(true)}
                  className="sm:hidden p-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  aria-label="Contact Us"
                >
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Branches List */}
          <div className="p-4 md:p-6 space-y-4">
            {selectedRestaurant.branches.map((branch) => (
              <div
                key={branch.id}
                className="relative p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row justify-between md:pt-0 pt-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {branch.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Manager: {branch.manager}
                      </p>
                      <p className="text-sm text-gray-500">
                        Contact: {branch.phone}
                      </p>
                      <p className="text-sm text-gray-500">{branch.email}</p>
                    </div>
                  </div>

                  {/* Edit and Delete buttons */}
                  <div className="flex flex-row justify-between md:pt-0 pt-4">
                    <div>
                      <button
                        onClick={() => handleMenuClick(branch)}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${
                          branch.menuLink
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-500 hover:bg-gray-600"
                        }`}
                      >
                        {branch.menuLink ? "Menu" : "Add Menu"}
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() =>
                          editBranch(selectedRestaurant.id, branch.id)
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick(
                            selectedRestaurant.id,
                            branch.id,
                            branch.name
                          )
                        }
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Branch Button */}
            <button
              onClick={() => addBranch(selectedRestaurant.id)}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
            >
              <Plus className="h-4 w-4" />
              Add Branch
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        restaurant={selectedRestaurant}
      />

      {/* Delete Branch Modal */}
      {branchToDelete && (
        <DeleteBranchModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          branchName={branchToDelete.name}
        />
      )}
    </div>
  );
};

export default RestaurantList;
