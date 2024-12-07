import React from "react";
import { QrCode, Download, ExternalLink } from "lucide-react";

interface SuccessScreenProps {
  qrCode: string;
  isAddMenu: boolean;
  onClose: () => void;
}

const SuccessScreen = ({ qrCode, isAddMenu, onClose }: SuccessScreenProps) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
        <QrCode className="h-6 w-6 text-green-600" />
      </div>

      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {isAddMenu ? "Menu Added Successfully!" : "QR Code Generated!"}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {isAddMenu
          ? "Your menu has been uploaded and is now accessible via QR code"
          : "Your QR code has been generated and is ready to use"}
      </p>

      <div className="mt-8 flex justify-center">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
            <QrCode className="w-32 h-32 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => {
            /* Handle download */
          }}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200"
        >
          <Download className="h-4 w-4 mr-2" />
          Download QR
        </button>

        <button
          onClick={() => {
            /* Handle preview */
          }}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Preview Menu
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={onClose}
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
