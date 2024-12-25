import React from "react";

interface FormStepsSidebarProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const FormStepsSidebar: React.FC<FormStepsSidebarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-1/4 px-4 hidden lg:block">
      <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6 h-full">
        <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 p-2 mb-4">
          Steps
        </h2>
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={index}
              onClick={() => onStepClick(index)}
              className={`cursor-pointer py-2 px-4 rounded-lg text-sm font-medium ${
                currentStep === index
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
