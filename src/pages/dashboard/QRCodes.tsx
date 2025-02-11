import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QrCode, Download, Share2, Eye } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useGetAllMenusQuery } from "../../store/services/qrMenuApi";
import LoadingScreen from "../../components/common/LoadingScreen";
import { MenuData } from "../../types";
import ActionRequired from "../../components/common/ActionRequired";
import { toast } from "react-toastify";
import { QRCode } from "react-qrcode-logo";
import { displayDate } from "../../utils/displayDate";
import { useProfileFeature } from "../../hooks/useProfileFeature";

const QRCodes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [qrToMenuMap, setQrToMenuMap] = useState<{
    [key: string]: { url: string };
  }>({});
  const { data: qrCodesResponse, isLoading, refetch } = useGetAllMenusQuery();
  const { checkFeature } = useProfileFeature();

  const setQrCodes = useCallback(() => {
    const qrToMenu = menuData.reduce(
      (acc: { [key: string]: { url: string } }, menu) => {
        const url = `${window.location.origin}/menu/${menu.id}?theme=${menu.theme}`;
        acc[menu.id] = { url: url };
        return acc;
      },
      {}
    );

    setQrToMenuMap(qrToMenu);
  }, [menuData]);

  useEffect(() => {
    if (qrCodesResponse?.success) {
      setMenuData(qrCodesResponse.data);
    }
    setQrCodes();
  }, [qrCodesResponse, setQrCodes]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const handleGenerateQR = async () => {
    if (!await checkFeature("QR_MENU")) {
      toast.error("Not enough credits to create menu");
    } else {
      navigate("/qr/generate");
    }
  };

  const handleShare = async (data: MenuData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Menu QR Code",
          text: `Check out the menu for ${data.branch?.name}`,
          url: qrToMenuMap[data.id].url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          toast.error("Error while sharing");
        }
      }
    } else {
      toast.error("Share not supported on this browser");
    }
  };

  const handleDownload = (data: MenuData) => {
    const canvas = document
      .getElementById(`qr-canvas-${data.id}`)
      ?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.branch?.name}-QRCode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = (data: MenuData) => {
    window.open(`/menu/${data.id}?theme=${data.theme}`, "_blank");
  };

  if (
    isLoading ||
    (menuData.length !== 0 && !Object.keys(qrToMenuMap).length)
  ) {
    return <LoadingScreen />;
  }

  if (menuData.length === 0) {
    return (
      <DashboardLayout>
        <ActionRequired
          icon={<QrCode className="h-32 w-32 text-gray-400" />}
          description={"Create new QR codes to share your menu"}
          buttonClassName="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors duration-200"
          buttonText="Generate QR"
          onButtonClick={handleGenerateQR}
          buttonIcon={<QrCode className="mr-2 h-4 w-4" />}
        />
      </DashboardLayout>
    );
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
                  <button
                    onClick={() => handleView(data)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => handleShare(data)}
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => handleDownload(data)}
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="h-48 w-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div id={`qr-canvas-${data.id}`}>
                    <QRCode
                      value={qrToMenuMap[data.id].url}
                      size={192}
                      logoPaddingStyle="circle"
                      qrStyle="dots"
                      eyeRadius={8}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                {/* <div>
                  <p className="text-sm font-medium text-gray-500">
                    Visits
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {2}
                  </p>
                </div> */}
                  <div className="text-sm font-semibold text-gray-500">
                    Last Updated:
                  </div>
                  <div className="text-sm text-gray-900 text-end">{displayDate(data.updated_at)}
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
