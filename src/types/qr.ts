export interface QRCode {
  id: string;
  name: string;
  type: "menu" | "table" | "special";
  description?: string;
  imageUrl: string;
  restaurantId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface QRCodeFormData {
  name: string;
  type: "menu" | "table" | "special";
  description?: string;
  restaurantId: string;
  branchId: string;
}
