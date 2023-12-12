import React, { useCallback, Fragment } from "react";
import {
  FormStep,
  FormComponents,
  FormStepWrapperComponent,
  FormErrortextComponent,
  FormHelpertextComponent,
  FormButtonComponent,
} from "../config/form-types";
import { DefaultStepWrapper } from "../config/defaults";

interface StepProps {
  stepData: FormStep;
  stepIndex: number;
  components: FormComponents;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    stepIndex: number,
    fieldIndex: number
  ) => void;
  handleBlur: (
    e: React.ChangeEvent<HTMLInputElement>,
    stepIndex: number,
    fieldIndex: number
  ) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// **************** StepRenderer component
const StepRenderer: React.FC<StepProps> = React.memo(
  ({
    stepData,
    stepIndex,
    components,
    handleChange,
    handleSubmit,
    handleBlur,
  }) => {
    // **************** Memoized functions to handle change and focus events for fields
    const memoizedOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        handleChange(e, stepIndex, index);
      },
      [handleChange, stepIndex]
    );

    const memoizedOnBlur = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        handleBlur(e, stepIndex, index);
      },
      [handleBlur, stepIndex]
    );

    // ************** Render form fields in step using the components provided
    const renderStepFields = () => {
      return stepData.fields.map((formField: any, index: number) => {
        const FieldComponent = components[formField?.type] || null;
        const ErrorTextComponent: FormErrortextComponent =
          components?.errortext;
        const HelperTextComponent: FormHelpertextComponent =
          components?.helpertext;

        const showErrorText =
          !!formField?.errorText &&
          formField.state.invalid &&
          formField.state.touched;

        const showHelperText =
          !!formField?.helperText &&
          formField.state.touched &&
          formField.state.invalid;

        return (
          <Fragment key={`stepfragment${index}`}>
            {FieldComponent && (
              <FieldComponent
                data={{
                  ...formField,
                  index,
                }}
                onChange={(e) => memoizedOnChange(e, index)}
                onBlur={(e) => memoizedOnBlur(e, index)}
              />
            )}
            {
              formField?.helperText ? 
              <HelperTextComponent
                data={{ text: formField.helperText, show: showHelperText }}
              /> : null
            }
            {
               formField?.errorText ? 
               <ErrorTextComponent
                 data={{ text: formField.errorText, show: showErrorText }}
               /> : null
            }
          
          </Fragment>
        );
      });
    };

    const StepWrapperComponent: FormStepWrapperComponent =
      components?.stepwrapper || DefaultStepWrapper;
    const disabled = !(stepData as any)?.valid;
    const ButtonComponent: FormButtonComponent = stepData[stepIndex]?.button || components.button;
    const memoizedOnSubmit = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSubmit(e);
      },
      [handleSubmit]
    );
    return (
      <StepWrapperComponent data={{ stepTitle: stepData.title }}>
        {renderStepFields()}
        {ButtonComponent && (
          <ButtonComponent
            data={{ disabled: disabled }}
            onClick={(e) => memoizedOnSubmit(e)}
          />
        )}
      </StepWrapperComponent>
    );
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.stepData) === JSON.stringify(nextProps.stepData)
    );
  }
);

export default StepRenderer;
