import { memo } from "react";
import { FormPreviewWrapperComponent } from "../../library/multi-step-form/config/form-types";

const PreviewWrapper: FormPreviewWrapperComponent = memo(({ children }) => {
  return (
    <div className="w-full h-full flex flex-col item-center p-3 m-2 justify-center items-center ">
      <div className="w-[400px] h-auto bg-primary py-[12px] px-[20px] rounded-[25px]">{children}</div>
    </div>
  );
});
export default PreviewWrapper;
