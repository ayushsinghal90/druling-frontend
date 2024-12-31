import React from "react";
import { Button } from "../ui/Button";

interface ActionRequiredProps {
  icon: React.ReactNode;
  description: string;
  buttonText: React.ReactNode;
  buttonClassName?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick: () => void;
}

const ActionRequired = ({
  icon,
  description,
  buttonText,
  buttonClassName,
  buttonIcon = "",
  onButtonClick,
}: ActionRequiredProps) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="w-auto h-auto">{icon}</div>
      <p className="text-center text-gray-700">{description}</p>
      {!buttonClassName ? (
        <div>
          <Button onClick={onButtonClick} type="button" aria-label="Contact Us">
            {buttonIcon}
            {buttonText}
          </Button>
        </div>
      ) : (
        <button onClick={onButtonClick} className={buttonClassName}>
          {buttonIcon}
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ActionRequired;
