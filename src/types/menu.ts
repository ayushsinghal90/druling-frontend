import { Branch } from "./branch";
import { MenuImage } from "./menuImage";

export interface MenuData {
  id: string;
  title: string;
  images: MenuImage[];
  branch: Branch;
  createdAt: string;
  updatedAt: string;
}
