import { memo } from "react";
import { InputTextComponent } from "../../library/multi-step-form/config/form-types";
import { svgs } from "../../assets/svgs/svgs";
import { ERROR_TYPES } from "../../library/multi-step-form/config/constants";

const Input: InputTextComponent = memo(
  ({ data, onChange, onBlur }) => {
    const { value, type, placeholder, disabled, name, state, index, label } =
      data;
    return (
      <div className=" mt-[5px] w-full mb-1">
        <label className="text-white" htmlFor={`name${index}`}>
          {label}
        </label>
        <div className="flex justify-center items-center bg-white mt-[5px] relative p-0">
          <input
            id={`name${index}`}
            className="w-full min-h-[40px] outline-none  bg-transparent px-[10px] pr-[30px]"
            type={type || "text"}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            onInput={onChange}
            onBlur={onBlur}
          />
          <span className="mr-2 absolute right-0 top-0 h-full flex items-center">
            {state.touched &&
              state.errors?.includes(ERROR_TYPES.pattern) &&
              svgs.ErrorSquare}
          </span>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
  }
);

export default Input;
