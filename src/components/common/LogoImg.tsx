import React from "react";
import { ReactSVG } from "react-svg";
import logo from "../../assets/logo.svg";

const LogoImg = ({ className = "h-8 w-8" }: { className?: string }) => (
  <ReactSVG src={logo} className={className} />
);

export default LogoImg;
