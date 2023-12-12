import { memo } from "react";
import { FormButtonComponent } from "../../library/multi-step-form/config/form-types";

const Button: FormButtonComponent = memo(({ data, onClick }) => {
  const { disabled, text, activeStep, steps } = data;
  const isLastStep = activeStep === (steps?.length -1);
  console.log(isLastStep)
  const handleSubmit = (e) => {
    onClick(e);
  };
  return (
    <button
      disabled={disabled}
      className={` ${isLastStep ? 'inline-block' :'md:inline-block hidden' } text-lg text-[24px]  text-arivalDark leading-[29.05px] p-2 min-h-[60px] w-full rounded-[5px] mt-[20px] mb-[35px] ${
        disabled ? "md:bg-inactive bg-active" : "bg-white md:text-inherit"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        handleSubmit(e);
      }}
    >
      {text || "Continue"}
    </button>
  );
});

export default Button;
