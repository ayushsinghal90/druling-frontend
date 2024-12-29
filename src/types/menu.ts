import { Branch } from "./branch";
import { MenuImage } from "./menuImage";

export interface MenuData {
  id: string;
  files: MenuImage[];
  branch: Branch;
  createdAt: string;
  updatedAt: string;
}
