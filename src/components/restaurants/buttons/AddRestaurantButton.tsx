import React from "react";

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

export default AddRestaurantButton;
