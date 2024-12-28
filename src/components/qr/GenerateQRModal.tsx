import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, QrCode, Loader2 } from "lucide-react";

interface GenerateQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId?: string;
  branchId?: string;
}

const GenerateQRModal = ({
  isOpen,
  onClose,
  restaurantId,
  branchId,
}: GenerateQRModalProps) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    console.log("restaurantId", restaurantId);
    // Navigate to the QR generation page with restaurant and branch details
    navigate(
      `/qr/generate${
        restaurantId && branchId
          ? `?restaurantId=${restaurantId}&branchId=${branchId}`
          : ""
      }`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <QrCode className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900">
            Generate QR Code
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Create a new QR code for your menu or special offers. Customers can
          scan this code to view your digital menu instantly.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQRModal;
