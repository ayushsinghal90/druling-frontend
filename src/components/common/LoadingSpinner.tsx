import React from "react";
import LoadingLogo from "./LoadingLogo";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return <LoadingLogo className={`${sizeClasses[size]} ${className}`} />;
};

export default LoadingSpinner;
