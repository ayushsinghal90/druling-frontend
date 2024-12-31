import React from "react";
import LogoImg from "./LogoImg";
import { useNavigate } from "react-router-dom";

const Logo = ({
  size = "h-8 w-8",
  color = "text-black",
  textSize = "text-2xl",
}: {
  size?: string;
  color?: string;
  textSize?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[140px] flex items-center cursor-default"
      onClick={() => navigate("/")}
    >
      <LogoImg className={`${size} ${color}`} />
      <span className={`${textSize} font-bold ${color} font-comfortaa p-2`}>
        druling
      </span>
    </div>
  );
};

export default Logo;
