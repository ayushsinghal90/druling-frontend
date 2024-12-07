import { useState } from "react";
import { QRCode, QRCodeFormData } from "../types/qr";

export const useQRCode = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = async (
    data: QRCodeFormData
  ): Promise<QRCode | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      // Mock API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const qrCode: QRCode = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        type: data.type,
        description: data.description,
        imageUrl:
          "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=example",
        restaurantId: data.restaurantId,
        branchId: data.branchId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return qrCode;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate QR code"
      );
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    error,
    generateQRCode,
  };
};
