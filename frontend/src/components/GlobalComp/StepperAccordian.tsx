import React, { useState } from "react";

type Step = {
  title: string;
  content: React.ReactNode;
};

const steps: Step[] = [
  {
    title: "Basic details",
    content: (
      <div>
        <p>This is the basic details content.</p>
      </div>
    ),
  },
  {
    title: "Company details",
    content: (
      <div>
        <p>This is the company details content.</p>
      </div>
    ),
  },
  {
    title: "Subscription plan",
    content: (
      <div>
        <p>This is the subscription plan content.</p>
      </div>
    ),
  },
  {
    title: "Payment details",
    content: (
      <div>
        <p>This is the payment details content.</p>
      </div>
    ),
  },
];

const StepperWithAccordion: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const handleProceed = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="flex max-w-4xl mx-auto border rounded-md shadow-md overflow-hidden">
      {/* Left side: Stepper */}
      <div className="w-1/3 bg-gray-50 border-r border-gray-300">
        {steps.map((step, i) => {
          const isCompleted = i < activeStep;
          const isActive = i === activeStep;

          return (
            <div
              key={i}
              onClick={() => handleStepClick(i)}
              className={`cursor-pointer flex items-center p-4 border-b border-gray-200
                ${
                  isActive
                    ? "bg-white font-semibold text-blue-600"
                    : isCompleted
                    ? "text-green-600"
                    : "text-gray-500"
                }
              `}
            >
              {/* Circle with check or step number */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 border-2
                  ${
                    isCompleted
                      ? "bg-green-600 border-green-600 text-white"
                      : isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300"
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>

              {/* Step title */}
              <div>{step.title}</div>
            </div>
          );
        })}
      </div>

      {/* Right side: Step content */}
      <div className="w-2/3 p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">{steps[activeStep].title}</h2>
        <div>{steps[activeStep].content}</div>
        <div className="mt-6 text-right">
          {activeStep < steps.length - 1 ? (
            <button
              onClick={handleProceed}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Next Step
            </button>
          ) : (
            <span className="text-green-600 font-semibold">All steps completed!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperWithAccordion;
