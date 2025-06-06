import React, { useState, useEffect } from "react";
import { QrCode, X, Download, Share2, Copy, ExternalLink } from "lucide-react";
import { MenuTypes } from "../menu/utils/MenuTypes";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
  branchName: string;
  theme: MenuTypes;
}

const SuccessModal = ({
  isOpen,
  onClose,
  menuId,
  branchName,
  theme,
}: SuccessModalProps) => {
  const [menuUrl, setMenuUrl] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    const url = `${window.location.origin}/menu/${menuId}?theme=${theme}`;
    setMenuUrl(url);
  }, [isOpen, menuId, theme]);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Menu QR Code",
          text: `Check out the menu for ${branchName}`,
          url: menuUrl,
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

  const handleDownloadQR = () => {
    const canvas = document
      .getElementById(`qr-canvas`)
      ?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${branchName}-QRCode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="px-6 pt-12 pb-8">
            {/* Success icon and message */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <QrCode className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Menu Published Successfully!
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Your menu is now live and ready to be shared with your customers
              </p>
            </div>

            {/* QR Code */}
            <div className="mt-8">
              <div className="relative mx-auto w-48">
                <div
                  className="aspect-square overflow-hidden rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-100"
                  id={`qr-canvas`}
                >
                  <QRCode
                    value={menuUrl}
                    logoPaddingStyle="circle"
                    qrStyle="dots"
                    eyeRadius={8}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                {/* Action buttons */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 space-y-2">
                  <button
                    onClick={handleDownloadQR}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-100 transition-all hover:ring-2 hover:ring-gray-200"
                  >
                    <Download className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-100 transition-all hover:ring-2 hover:ring-gray-200"
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu URL */}
            <div className="mt-8">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{menuUrl}</span>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center space-x-1 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleClose}
                className="rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
