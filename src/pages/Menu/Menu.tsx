import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import IndexMenu from "../../components/menu/Index";
import { useMenuData } from "../../components/menu/utils/useMenuData";
import LoadingScreen from "../../components/common/LoadingScreen";

const Menu = () => {
  const { menuId } = useParams();
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme") || "default";

  const { loading, menuData } = useMenuData(menuId);

  if (loading || !menuData) {
    return <LoadingScreen />;
  }

  const props = { menuData: { menuData }, type: theme };

  return <IndexMenu {...props} />;
};

export default Menu;
