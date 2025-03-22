import PropTypes from "prop-types";

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

  return (
    <div className="border-2 border-black rounded-xl mt-10 bg-white max-w-screen-xl mx-auto p-6 z-10">
      {/* Stepper Bar */}
      <div className="flex items-center justify-between w-full relative">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative w-full">
            {/* Step Circle */}
            <button
              className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold cursor-pointer
                ${
                  currentStep === step.id ? "bg-blue-600" : "bg-gray-400"
                } transition-all`}
              onClick={() => setCurrentStep(step.id)}>
              {step.id}
            </button>

            {/* Step Label */}
            <span className="text-sm text-gray-600 mt-2">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-6 text-center text-lg font-medium">
        {steps.find((step) => step.id === currentStep)?.content}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          className={`px-4 py-2 rounded-md ${
            currentStep === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
          } `}
          onClick={() => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev))}
          disabled={currentStep === 1}>
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            currentStep === steps.length
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          } `}
          onClick={() =>
            setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev))
          }
          disabled={currentStep === steps.length}>
          Next
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
