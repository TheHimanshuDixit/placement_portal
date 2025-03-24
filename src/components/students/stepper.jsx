import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const StepperComponent = ({ currentStep, setCurrentStep }) => {
  const steps = [
    {
      id: 1,
      label: "Highest Package",
      content: "Rs 60.71 Lacs by LinkedIn (2 Offers)",
    },
    {
      id: 2,
      label: "Second Highest",
      content: "Rs 52.00 Lacs by Microsoft India (2 Offers)",
    },
    {
      id: 3,
      label: "Third Highest",
      content: "Rs 37.37 Lacs by CISCO (1 Offer)",
    },
  ];

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300);
  }, []);

  return (
    <div
      className={`border-2 border-gray-300 rounded-xl my-10 p-6 z-10 shadow-lg max-w-screen-xl mx-auto bg-transparent transition-all duration-700 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
      {/* Stepper Bar */}
      <div className="flex items-center justify-between w-full relative">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative w-full">
            {/* Step Circle */}
            <button
              className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold shadow-md transform transition-all duration-300 ease-in-out
                ${
                  currentStep === step.id
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-400 scale-100"
                }`}
              onClick={() => setCurrentStep(step.id)}>
              {currentStep > step.id ? (
                <FaCheckCircle className="text-white" />
              ) : (
                step.id
              )}
            </button>
            {/* Step Label */}
            <span className="text-sm text-gray-700 mt-2 font-semibold">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-6 text-center text-lg font-medium text-gray-800">
        {steps.find((step) => step.id === currentStep)?.content}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300
            ${
              currentStep === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          onClick={() => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev))}
          disabled={currentStep === 1}>
          <FaArrowLeft /> Previous
        </button>
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300
            ${
              currentStep === steps.length
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          onClick={() =>
            setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev))
          }
          disabled={currentStep === steps.length}>
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

StepperComponent.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default StepperComponent;
