import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ChevronDown, Building2 } from "lucide-react";
import ContactModal from "./ContactModal";
import DeleteBranchModal from "./DeleteBranchModal";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { Branch, Restaurant } from "../../types";
import BranchItem from "./BranchItem";
import AddRestaurantButton from "./buttons/AddRestaurantButton";
import AddBranchButton from "./buttons/AddBranchButton";
import ContactUsButton from "./buttons/ContactUsButton";
import ActionRequired from "../common/ActionRequired";
import { useProfileFeature } from "../../hooks/useProfileFeature";
import { toast } from "react-toastify";

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
  const { checkFeature } = useProfileFeature();

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

  const handleMenuClick = async (branch: Branch) => {
    if (!await checkFeature("QR_MENU")) {
      toast.error("Not enough credits to create menu");
    } else {
      if (!branch?.menu?.id) {
        navigate(`/qr/menu/${selectedRestaurant?.id}/${branch.id}`);
      } else {
        window.open(
          `/menu/${branch.menu.id}?theme=${branch.menu.theme}`,
          "_blank"
        );
      }
    }
  };

  if (!selectedRestaurant || !restaurants.length) {
    return (
      <div className="space-y-6">
        <ActionRequired
          icon={<Building2 className="h-32 w-32 text-gray-400" />}
          description={"Please add restaurant before proceeding"}
          buttonText="Add Restaurant"
          onButtonClick={addRestaurant}
        />
      </div>
    );
  }

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
        imageUrl={selectedRestaurant.img_url}
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
          <Building2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
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
          {restaurant.img_url ? (
            <img
              src={restaurant.img_url}
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

export default RestaurantList;
