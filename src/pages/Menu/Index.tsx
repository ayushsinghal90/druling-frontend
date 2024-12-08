import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DefaultMenu from "./Default";
import ClassicMenu from "./Classic";
import ModernMenu from "./Modern";
import ScrollingMenu from "./Scrolling";
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

  const props = { menuData };

  return (
    <>
      {theme === "classic" ? (
        <ClassicMenu {...props} />
      ) : theme === "modern" ? (
        <ModernMenu {...props} />
      ) : theme === "scrolling" ? (
        <ScrollingMenu {...props} />
      ) : (
        <DefaultMenu {...props} />
      )}
    </>
  );
};

export default Menu;
