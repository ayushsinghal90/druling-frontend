import React from "react";
import { ReactSVG } from "react-svg";

const LogoImg = ({ className = "h-8 w-8" }: { className?: string }) => (
  <ReactSVG src="/src/assets/logo.svg" className={className} />
);

export default LogoImg;
