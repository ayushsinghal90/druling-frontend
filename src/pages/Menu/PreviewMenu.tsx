import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IndexMenu from "../../components/menu/Index";
import { MenuProps } from "../../components/menu/utils/MenuProps";

const PreviewMenu = () => {
  const [menuData, setMenuData] = useState<MenuProps>({} as MenuProps);
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme") || "default";

  useEffect(() => {
    const storedMenuData = localStorage.getItem("menuData");
    if (storedMenuData) {
      setMenuData(JSON.parse(storedMenuData));
    }
  }, []);

  const props = { menuData, type: theme };

  return <IndexMenu {...props} />;
};

export default PreviewMenu;
