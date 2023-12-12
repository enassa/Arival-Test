import { FormNavigationComponent } from '../../library/multi-step-form/config/form-types';


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
        <div
          style={{ animationDelay: `${index * 100} !important` }}
          onClick={() => handleStepChange(index)}
          key={`navigators_${index}`}
          className={`min-w-30 whitespace-nowrap flex items-center w-full rounded-full shadaow-md cursor-pointer mt-[20px] animate-rise`}
        >
          <span
            className={`min-w-[16px] rounded-sm mr-2 min-h-[16px] w-[16px] h-[16px] ${
              isActiveStep
                ? 'bg-active'
                : isValidStep
                ? 'bg-tertiary'
                : 'bg-disabled'
            }`}
          ></span>
          <span
            className={`${
              isActiveStep
                ? 'text-active'
                : isValidStep
                ? 'text-tertiary'
                : 'text-disabled'
            }`}
          >
            {item.title}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="flex justify-start flex-col h-full absolute left-0 top-0 item-center p-3 m-2 rounded-md text-blue-900">
      {getSteps()}
    </div>
  );
};

export default StepNavigator;
