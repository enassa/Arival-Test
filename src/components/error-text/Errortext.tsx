import { FormErrortextComponent } from "../../library/multi-step-form/config/form-types";

const Errortext: FormErrortextComponent = ({ data }) => {
  const { text, show } = data;
  return <div className="text-red-100 w-full text-xs min-h-[15px] h-[15px] text-">
      {show && <span>{text}</span>}
    </div>;
}

export default Errortext;