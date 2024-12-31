import { MenuImage } from "../menuImage";

export interface UploadMenu {
  branch_id: string;
  files: UploadMenuImage;
}

export interface UploadMenuImage extends Omit<MenuImage, "file_url"> {
  file_key: string;
}
