import { MenuTypes } from "../../menu/utils/MenuTypes";
import { ImageData } from "./ImageData";

export interface MenuDetails {
  theme: MenuTypes;
  imagesData: ImageData[];
}
