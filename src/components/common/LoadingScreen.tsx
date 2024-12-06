import React from "react";
import LoadingLogo from "./LoadingLogo";

interface LoadingScreenProps {
  fullScreen?: boolean;
}

const LoadingScreen = ({ fullScreen = true }: LoadingScreenProps) => {
  const containerClasses = fullScreen ? "fixed inset-0 z-50" : "w-full h-full";

  return (
    <div
      className={`${containerClasses} flex flex-col items-center justify-center bg-white`}
    >
      <div className="flex flex-col items-center">
        <LoadingLogo className="h-10 w-10 text-black" />
        <span className="mt-4 text-xl font-bold text-black font-comfortaa">
          druling
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
