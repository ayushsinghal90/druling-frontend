import { Restaurant, Branch } from "./restaurant";

export interface MenuData {
  id: string;
  title: string;
  images: MenuImage[];
  restaurant: Pick<Restaurant, "id" | "name">;
  branch: Pick<Branch, "id" | "name">;
  createdAt: string;
  updatedAt: string;
}

export interface MenuImage {
  id: number;
  url: string;
  title: string;
  order: number;
}
