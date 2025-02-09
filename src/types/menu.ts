import { Branch } from "./branch";
import { MenuImage } from "./menuImage";

export interface MenuData {
  id: string;
  theme: string;
  files: MenuImage[];
  branch: Branch;
  created_at: string;
  updated_at: string;
}
