import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Image, ChevronDown, Pencil, Trash2, Phone } from "lucide-react";
import ContactModal from "./ContactModal";
import DeleteBranchModal from "./DeleteBranchModal";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { Branch, Restaurant } from "../../types";
import { Button } from "../ui/Button";

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
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleDeleteClick = (branch: Branch) => {
    setBranchToDelete(branch);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (branchToDelete && selectedRestaurant) {
      deleteBranch(selectedRestaurant?.id ?? "", branchToDelete.id ?? "");
      setShowDeleteModal(false);
    }
  };

  const handleMenuClick = (branch: Branch) => {
    if (!branch.menu_id) {
      navigate(`/qr/menu/${selectedRestaurant?.id}/${branch.id}`);
    } else {
      navigate(`/menu/${branch.menu_id}`);
    }
  };

  if (!selectedRestaurant) return null;

  return (
    <div className="space-y-6">
      <AddRestaurantButton onClick={addRestaurant} />
      <RestaurantDetails
        selectedRestaurant={selectedRestaurant}
        restaurants={restaurants}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        selectRestaurant={selectRestaurant}
        dropdownRef={dropdownRef}
        setShowContactModal={setShowContactModal}
      />
      <div className="bg-white rounded-lg shadow-sm">
        <BranchesList
          branches={selectedRestaurant.branches ?? []}
          handleMenuClick={handleMenuClick}
          handleDeleteClick={handleDeleteClick}
          editBranch={editBranch}
          selectedRestaurantId={selectedRestaurant.id}
          addBranch={addBranch}
        />
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          restaurant={selectedRestaurant}
        />
        {branchToDelete && (
          <DeleteBranchModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            branchName={branchToDelete.name}
          />
        )}
      </div>
    </div>
  );
};

const AddRestaurantButton = ({ onClick }: { onClick: () => void }) => (
  <div className="flex justify-end">
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors duration-200"
    >
      Add Restaurant
    </button>
  </div>
);

const RestaurantDetails = ({
  selectedRestaurant,
  restaurants,
  isDropdownOpen,
  setIsDropdownOpen,
  selectRestaurant,
  dropdownRef,
  setShowContactModal,
}: {
  selectedRestaurant: Restaurant;
  restaurants: Restaurant[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectRestaurant: (restaurant: Restaurant) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="relative">
      <RestaurantImage
        imageUrl={selectedRestaurant.image_url}
        name={selectedRestaurant.name}
      />
      <div className="p-4 md:p-6 border-b border-gray-100/75">
        <div className="flex flex-row md:items-center justify-between gap-4">
          <div className="flex items-center ml-32">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="group flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-200"
              >
                {selectedRestaurant.name}
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <DropdownMenu
                  restaurants={restaurants}
                  selectRestaurant={selectRestaurant}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
            </div>
          </div>
          <ContactUsButton setShowContactModal={setShowContactModal} />
        </div>
      </div>
    </div>
  </div>
);

const RestaurantImage = ({
  imageUrl,
  name,
}: {
  imageUrl: string | undefined;
  name: string;
}) => (
  <div className="absolute -top-12 left-5 w-24 h-24">
    <div className="w-full h-full rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-50">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Image className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const DropdownMenu = ({
  restaurants,
  selectRestaurant,
  setIsDropdownOpen,
}: {
  restaurants: Restaurant[];
  selectRestaurant: (restaurant: Restaurant) => void;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
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
          {restaurant.image_url ? (
            <img
              src={restaurant.image_url}
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
);

const ContactUsButton = ({
  setShowContactModal,
}: {
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <>
    <Button
      onClick={() => setShowContactModal(true)}
      type="button"
      variant="outline"
      className="hidden sm:block px-4 py-2 text-sm font-medium"
    >
      Contact Us
    </Button>
    <Button
      onClick={() => setShowContactModal(true)}
      type="button"
      variant="outline"
      className="sm:hidden"
      aria-label="Contact Us"
    >
      <Phone className="h-5 w-5" />
    </Button>
  </>
);

const BranchesList = ({
  branches,
  handleMenuClick,
  handleDeleteClick,
  editBranch,
  selectedRestaurantId,
  addBranch,
}: {
  branches: Branch[];
  handleMenuClick: (branch: Branch) => void;
  handleDeleteClick: (branch: Branch) => void;
  editBranch: (restaurantId: string, branchId: string) => void;
  selectedRestaurantId: string | undefined;
  addBranch: (restaurantId: string) => void;
}) => (
  <div className="p-4 md:p-6 space-y-4">
    {branches.map((branch) => (
      <BranchItem
        key={branch.id}
        branch={branch}
        handleMenuClick={handleMenuClick}
        handleDeleteClick={handleDeleteClick}
        editBranch={editBranch}
        selectedRestaurantId={selectedRestaurantId}
      />
    ))}
    <AddBranchButton onClick={() => addBranch(selectedRestaurantId ?? "")} />
  </div>
);

const BranchItem = ({
  branch,
  handleMenuClick,
  handleDeleteClick,
  editBranch,
  selectedRestaurantId,
}: {
  branch: Branch;
  handleMenuClick: (branch: Branch) => void;
  handleDeleteClick: (branch: Branch) => void;
  editBranch: (restaurantId: string, branchId: string) => void;
  selectedRestaurantId: string | undefined;
}) => (
  <div
    className="relative p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    onClick={() => editBranch(selectedRestaurantId ?? "", branch?.id ?? "")}
  >
    <div className="flex flex-col md:flex-row justify-between md:pt-0 pt-2">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-400" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
          <p className="text-sm text-gray-500">Manager: {branch.manager}</p>
          <p className="text-sm text-gray-500">
            Contact: {branch?.contact_info?.phone_number}
          </p>
          <p className="text-sm text-gray-500">{branch?.contact_info?.email}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between md:pt-0 pt-4">
        <div>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleMenuClick(branch);
            }}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 
                 bg-gray-900 hover:bg-gray-800"
          >
            {branch.menu_id ? "Menu" : "Add Menu"}
          </Button>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              editBranch(selectedRestaurantId ?? "", branch?.id ?? "");
            }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteClick(branch);
            }}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AddBranchButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
  >
    <Plus className="h-4 w-4" />
    Add Branch
  </button>
);

export default RestaurantList;
