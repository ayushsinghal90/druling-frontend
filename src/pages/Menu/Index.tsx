import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DefaultMenu from "./Default";
import ClassicMenu from "./Classic";
import ModernMenu from "./Modern";
import { MenuData } from "../../types/menu";
import { useMenuData } from "./utils/useMenuData";
import LoadingScreen from "../../components/common/LoadingScreen";

const Menu = () => {
  const { menuId } = useParams();
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme") || "default";

  const { loading, menuData } = useMenuData(menuId);

  if (loading || !menuData) {
    return <LoadingScreen />;
  }

  const renderMenu = () => {
    const props = { loading, menuData };

    switch (theme) {
      case "classic":
        return <ClassicMenu {...props} />;
      case "modern":
        return <ModernMenu {...props} />;
      default:
        return <DefaultMenu {...props} />;
    }
  };

  return renderMenu();
};

export default Menu;
