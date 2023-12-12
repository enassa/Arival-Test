import { memo } from "react";
import { FormPreviewWrapperComponent } from "../../library/multi-step-form/config/form-types";

const PreviewWrapper: FormPreviewWrapperComponent = memo(({ children }) => {
  return (
    <div className="w-full h-full flex md:justify-start items-center justify-center flex-col">
      <div className="md:w-[400px] w-[95%] md:h-auto justify-start flex flex-col bg-primary shadow-md md:shadow-none py-[12px] px-[20px] md:rounded-[25px] border-2  md:border-transparent md:border-0">
        {children}
      </div>
    </div>
  );
});
export default PreviewWrapper;
