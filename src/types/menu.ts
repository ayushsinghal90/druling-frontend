import { Restaurant, Branch } from "./restaurant";

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface MenuData {
  id: string;
  title: string;
  images: MenuImage[];
  restaurant: Pick<Restaurant, "id" | "name"> & {
    imageUrl?: string;
    socialLinks?: SocialLinks;
  };
  branch: Pick<Branch, "id" | "name"> & {
    imageUrl?: string;
    socialLinks?: SocialLinks;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MenuImage {
  id: number;
  url: string;
  title: string;
  order: number;
}
