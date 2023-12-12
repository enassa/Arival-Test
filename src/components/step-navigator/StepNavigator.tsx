import { FormNavigationComponent } from "../../library/multi-step-form/config/form-types";

const StepNavigator: FormNavigationComponent = ({ data, onChange }) => {
  const { activeStep, steps } = data;

  const handleStepChange = (index: number): void => {
    if (index === activeStep) return;
    onChange && onChange(index);
  };

  const getSteps = (): JSX.Element[] => {
    return steps.map((item, index) => {
      const isActiveStep = index === activeStep;
      const isValidStep = item.valid;

      return (
        <button
          style={{ animationDelay: `${index * 100} !important` }}
          onClick={() => handleStepChange(index)}
          key={`navigators_${index}`}
          className={`min-w-30 whitespace-nowrap flex items-center w-full rounded-full shadaow-md cursor-pointer mt-[20px] md:animate-rise `}
        >
          <span
            className={`min-w-[16px] rounded-sm mr-2 min-h-[16px] w-[16px] h-[16px] ${
              isActiveStep
                ? "bg-active"
                : isValidStep
                ? "bg-tertiary"
                : "bg-disabled"
            }`}
          ></span>
          <span
            className={`${
              isActiveStep
                ? "text-active"
                : isValidStep
                ? "text-tertiary"
                : "text-disabled"
            }`}
          >
            {item.title}
          </span>
        </button>
      );
    });
  };

  return (
    <div className="flex w-full md:w-auto  justify-start md:flex-col md:h-full h-[50px] z-[1] md:bg-transparent md:mt-[8%] fixed bottom-0 md:left-0 md:top-0 item-center p-3 pl-[4%] md:rounded-md text-blue-900">
      <div className="md:flex  hidden w-full  justify-start flex-col h-full z-[1] md:bg-transparent bg-white left-0 top-0 item-center p-3 pl-[4%] rounded-md text-blue-900">
        {getSteps()}
      </div>
      <div className="w-full flex md:hidden justify-between items-center  z-[1] md:bg-transparent bg-[#E3E0F1] fixed bottom-0 bg-filter left-0  item-center p-3  text-blue-900 px-6">
        <button disabled={(activeStep - 1) <  0} onClick={() => handleStepChange(activeStep - 1) }>Prev</button>
        <span className="text-active"> {steps[activeStep].title} </span>
        <button disabled={((activeStep + 1) > (steps.length -1)) && steps[activeStep].valid} onClick={() => handleStepChange(activeStep + 1)}>Next</button>
      </div>
    </div>
  );
};

export default StepNavigator;
