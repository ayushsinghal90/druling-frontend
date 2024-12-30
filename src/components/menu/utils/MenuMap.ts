import DefaultMenu from "../theme/Default";
import ModernMenu from "../theme/Modern";
import ScrollingMenu from "../theme/Scrolling";
import { MenuProps } from "./MenuProps";

export const menuMap: { [key: string]: React.ComponentType<MenuProps> } = {
  modern: ModernMenu,
  scrolling: ScrollingMenu,
  default: DefaultMenu,
};
