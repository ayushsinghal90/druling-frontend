import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Download, Share2 } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import GenerateQRModal from "../../components/qr/GenerateQRModal";

const qrCodes = [
  {
    id: 1,
    name: "Main Menu",
    description: "Primary restaurant menu QR code",
    scans: 1234,
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    name: "Table Service",
    description: "QR code for table-specific ordering",
    scans: 856,
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    name: "Special Offers",
    description: "Promotional menu and deals",
    scans: 432,
    lastUpdated: "2024-03-13",
  },
];

const QRCodes = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const restaurantName = "The Fine Diner"; // For demo purposes

  const handleGenerateQR = () => {
    navigate("/qr/generate");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">QR Codes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your menu QR codes
            </p>
          </div>
          <button
            onClick={handleGenerateQR}
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {qrCodes.map((qr) => (
            <div
              key={qr.id}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {qr.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{qr.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="h-48 w-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-gray-400" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Scans
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {qr.scans}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Updated
                  </p>
                  <p className="mt-1 text-sm text-gray-900">{qr.lastUpdated}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <GenerateQRModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          restaurantName={restaurantName}
        />
      </div>
    </DashboardLayout>
  );
};

export default QRCodes;
