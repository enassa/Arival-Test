import { memo } from "react";
import { FormButtonComponent } from "../../library/multi-step-form/config/form-types";

const Button: FormButtonComponent = memo(({ data, onClick }) => {
  const { disabled, text } = data;
  const handleSubmit = (e) => {
    onClick(e);
  };
  return (
    <button
      disabled={disabled}
      className={`text-lg text-[24px] text-arivalDark leading-[29.05px] p-2 min-h-[60px] w-full rounded-[5px] mt-[20px] mb-[35px] ${
        disabled ? "bg-inactive" : "bg-white"
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
