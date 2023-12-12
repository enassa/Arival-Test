import { memo } from "react";
import { FormStepWrapperComponent } from "../../library/multi-step-form/config/form-types";

const StepWrapper: FormStepWrapperComponent = memo(({ children }) => {
  return (
    <div className="w-full h-full flex  item-center items-start justify-center">
      <div className="flex flex-col justify-center h-full">
        <div className="bg-primary w-[400px]  p-[20px] pb-[7px] min-w-[400px] h-auto  rounded-[25px] flex justify-start items-center flex-col relative mb-[50px]">
          {children}
        </div>
      </div>
    </div>
  );
});
export default StepWrapper;
