import { memo } from "react";
import { FormHelpertextComponent } from "../../library/multi-step-form/config/form-types";

const HelperText: FormHelpertextComponent = memo(({ data }) => {
  const { text, show } = data;
  return <div className="md:text-arivalGray text-primary w-full text-xs min-h-[15px] h-[15px]">
  {show && <span>{text}</span>}
</div>;   
});
export default HelperText;
