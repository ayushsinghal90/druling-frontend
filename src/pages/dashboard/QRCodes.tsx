import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Download, Share2 } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useGetAllMenusQuery } from "../../store/services/qrMenuApi";
import LoadingScreen from "../../components/common/LoadingScreen";
import { MenuData } from "../../types";

const QRCode = ({ menu }: { menu: MenuData }) => {
  // ?theme=${theme}
  const url = `${window.location.origin}/menu/${menu.id}`;
  const code = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`;

  return <img src={code} alt="Menu QR Code" className="h-full w-full" />;
};

const QRCodes = () => {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const { data: qrCodesResponse, isLoading } = useGetAllMenusQuery();

  const handleGenerateQR = () => {
    navigate("/qr/generate");
  };

  useEffect(() => {
    if (qrCodesResponse?.success) {
      setMenuData(qrCodesResponse.data);
    }
  }, [qrCodesResponse]);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
          {menuData.map((data) => (
            <div
              key={data.id}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {data.branch?.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {data.branch?.description}
                  </p>
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
                  <QRCode menu={data} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Scans
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {2}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Updated
                  </p>
                  <p className="mt-1 text-sm text-gray-900">{data.updatedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QRCodes;
