import { FormErrortextComponent } from "../../library/multi-step-form/config/form-types";

const Errortext: FormErrortextComponent = ({ data }) => {
  const { text, show } = data;
  return <div className="md:text-red-100 text-error w-full text-xs min-h-[15px] h-[15px] mt-[2px]">
      {show && <span>{text}</span>}
    </div>;
}

export default Errortext;