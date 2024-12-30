import React from "react";
import { MenuProps } from "./utils/MenuProps";
import DefaultMenu from "./theme/Default";
import { menuMap } from "./utils/MenuMap";

interface IndexProps {
  menuData: MenuProps;
  type: string;
}

const MenuIndex = ({ menuData, type }: IndexProps) => {
  const theme = type;

  return (
    <>
      {(() => {
        const SelectedMenu = menuMap[theme] || DefaultMenu;
        return <SelectedMenu {...menuData} />;
      })()}
    </>
  );
};

export default MenuIndex;
