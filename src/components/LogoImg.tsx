import React from "react";
import logo from "../assets/logo.svg";

const LogoImg = ({ className = "h-8 w-8" }: { className?: string }) => {
  return <img src={logo} alt={"Druling"} className={className} />;
};

export default LogoImg;
