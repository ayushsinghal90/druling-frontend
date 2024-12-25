import { useState } from "react";

export const useMultiStepForm = (steps: string[], initialStep = 0) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const next = () => {
    setCurrentStep((curr) => (curr < steps.length - 1 ? curr + 1 : curr));
  };

  const previous = () => {
    setCurrentStep((curr) => (curr > 0 ? curr - 1 : curr));
  };

  const goTo = (step: number) => {
    const stepIndex = Math.max(0, Math.min(step, steps.length - 1));
    setCurrentStep(stepIndex);
  };

  return {
    currentStep,
    currentStepName: steps[currentStep],
    steps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    next,
    previous,
    goTo,
  };
};
