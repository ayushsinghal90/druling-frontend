import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DefaultMenu from "./Default";
import ClassicMenu from "./Classic";
import ModernMenu from "./Modern";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme") || "default";

  switch (theme) {
    case "classic":
      return <ClassicMenu />;
    case "modern":
      return <ModernMenu />;
    default:
      return <DefaultMenu />;
  }
};

export default Menu;
