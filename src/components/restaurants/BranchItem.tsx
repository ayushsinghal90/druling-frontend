import React from "react";
import { Pencil, Trash2, Building } from "lucide-react";
import { Branch } from "../../types";
import { Button } from "../ui/Button";

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
          <Building className="w-8 h-8 text-gray-400" />
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
            {branch?.menu?.id ? "Menu" : "Add Menu"}
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

export default BranchItem;
