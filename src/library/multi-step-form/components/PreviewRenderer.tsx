import React, { useCallback } from "react";
import {
  FormPreviewWrapperComponent,
  FormPreviewLabelComponent,
  FormButtonComponent,
} from "../config/form-types";
import {
  DefaultButton,
  DefaultPreviewLabel,
  DefaultPreviewpWrapper,
} from "../config/defaults";

interface PreviewProps {
  formState;
  handleSubmit;
}

// **************** StepRenderer component
const PreviewRenderer: React.FC<PreviewProps> = React.memo(
  ({ formState, handleSubmit }) => {

    const { components, formSteps, valid } = formState;
    const PreviewLabel: FormPreviewLabelComponent =  components.previewlabel || DefaultPreviewLabel;
    // ************** Render form fields in step using the components provided
    const renderPreviewLabels = () => {
      return formSteps.flatMap((step, stepIndex) =>
        step.fields.map((field, index) => {
          if(field.type === "password") return //******** No preview for password fields
          return (
            <PreviewLabel
            key={`labels${index}${stepIndex}`}
              data={{
                ...field,
              }}
            />
          );
        })
      );
    };

    const PreviewWrapper: FormPreviewWrapperComponent =  components?.previewwrapper || DefaultPreviewpWrapper;
    const ButtonComponent: FormButtonComponent = components.button || DefaultButton;
    const memoizedOnSubmit = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSubmit(e);
      },
      [handleSubmit]
    );

    return (
      <PreviewWrapper>
        {renderPreviewLabels()}
        {ButtonComponent && (
          <ButtonComponent
            data={{ disabled: !valid, text: 'Complete', steps: formState.formSteps, activeStep: formState.activeStep}}
            onClick={(e) => memoizedOnSubmit(e)}
          />
        )}
      </PreviewWrapper>
    );
    
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.formState.formSteps) ===
      JSON.stringify(nextProps.formState.formSteps)
    );
  }
);

export default PreviewRenderer;
