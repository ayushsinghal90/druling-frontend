import React from "react";
import { Plus } from "lucide-react";

const AddBranchButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
  >
    <Plus className="h-4 w-4" />
    Add Branch
  </button>
);

export default AddBranchButton;
