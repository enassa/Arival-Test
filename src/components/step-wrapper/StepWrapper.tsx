import { memo } from "react";
import { FormStepWrapperComponent } from "../../library/multi-step-form/config/form-types";

const StepWrapper: FormStepWrapperComponent = memo(({ children }) => {
  return (
    <div className="w-full h-full flex  item-center p-3 m-2 items-center justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-primary w-[400px]  p-[20px] min-w-[400px] h-auto  rounded-[25px] flex justify-start items-center flex-col relative">
          {children}
        </div>
      </div>
    </div>
  );
});
export default StepWrapper;
