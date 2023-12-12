import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import PreviewWrapper from "../../components/preview-wrapper/PreviewWrapper";
import StepWrapper from "../../components/step-wrapper/StepWrapper";
import TypeAhead from "../../components/typeahead/Typeahead";
import PreviewLabel from "../../components/preview-label/PreviewLabel";
import StepNavigator from "../../components/step-navigator/StepNavigator";
import MultiStepFormGenerator from "../../library/multi-step-form/form-service/form-context";
import Errortext from "../../components/error-text/Errortext";
import HelperText from "../../components/helper-text/HelperText";
import FormWrapper from "../../components/header/FormWrapper";
import { USER_FORM } from "./userform";
import {
  FormComponents,
  FormStep,
} from "../../library/multi-step-form/config/form-types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { saveObjectInSession } from "../../library/multi-step-form/form-utils/functions";

export default function TestForm() {
  const navigate = useNavigate();
  const handleChanges = (update: any) => {
    console.log(update);
  };

  const handleSubmit = (formData: any) => {
    saveObjectInSession("formData", formData);
    navigate(ROUTES.success.url);
  };

  // Component to be used in rendering the forms
  const components: FormComponents = {
    text: Input,
    number: Input,
    password: Input,
    typeahead: TypeAhead,
    button: Button,
    stepwrapper: StepWrapper,
    previewwrapper: PreviewWrapper,
    previewlabel: PreviewLabel,
    stepnavigator: StepNavigator,
    errortext: Errortext,
    helpertext: HelperText,
    formwrapper: FormWrapper,
  };

  //  ************ A Multistep form generator which allows user to handle styling
  return (
    <div className="w-full h-full flex items-start flex-col overflow-y-auto">
      <MultiStepFormGenerator
        title="Super test form"
        formSteps={USER_FORM as FormStep[]}
        previewTitle="Review"
        components={components}
        onSubmit={handleSubmit}
        onChange={handleChanges}
      />
    </div>
  );
}
