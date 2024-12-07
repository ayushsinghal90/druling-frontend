import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  branchName: string;
}

const DeleteBranchModal = ({
  isOpen,
  onClose,
  onConfirm,
  branchName,
}: DeleteBranchModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Delete Branch</h2>
        </div>

        <div className="mt-4 text-gray-600">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-900">{branchName}</span>?
          </p>
          <p className="mt-2">This will permanently delete:</p>
          <ul className="mt-2 ml-6 list-disc text-sm">
            <li>Branch information and settings</li>
            <li>Menu configurations</li>
            <li>QR codes associated with this branch</li>
            <li>Analytics data</li>
          </ul>
          <p className="mt-4 text-sm text-red-600">
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Delete Branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBranchModal;
