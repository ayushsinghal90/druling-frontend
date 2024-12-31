import React from "react";
import LogoImg from "./LogoImg";

const Logo = ({
  size = "h-8 w-8",
  color = "text-black",
  textSize = "text-2xl",
}: {
  size?: string;
  color?: string;
  textSize?: string;
}) => {
  return (
    <div className="w-[140px] flex items-center">
      <LogoImg className={`${size} ${color}`} />
      <span className={`${textSize} font-bold ${color} font-comfortaa p-2`}>
        druling
      </span>
    </div>
  );
};

export default Logo;
