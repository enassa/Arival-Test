import { memo } from "react";
import { FormStepWrapperComponent } from "../../library/multi-step-form/config/form-types";

const StepWrapper: FormStepWrapperComponent = memo(({ children }) => {
  return (
    <div className="w-full h-full flex  item-center items-start justify-center">
      <div className="flex flex-col items-center justify-start h-full w-full md:w-auto ">
        <div className="md:bg-primary md:w-[400px] w-[90%]  p-[20px] pb-[7px] md:min-w-[400px] h-auto  md:rounded-[25px] flex justify-start items-center flex-col relative mb-[50px]">
          {children}
        </div>
      </div>
    </div>
  );
});
export default StepWrapper;
