import React from "react";
import StepRenderer from "./StepRenderer";
import { useForm } from "../form-service/form-hook";
import { FormNavigationComponent, FormStep } from "../config/form-types";
import { STEP_TYPE } from "../config/constants";
import PreviewRenderer from "./PreviewRenderer";

const FormRenderer: React.FC = () => {
  const {
    formState,
    handleChange,
    handleSubmit,
    handleBlur,
    handleChangeStep,
    showByStep,
  } = useForm();

  const previewProps = {
    formState,
    handleSubmit,
  };

  const getRenderer = (stepData, props) => {
    return stepData.type === STEP_TYPE.preview ? (
      <PreviewRenderer {...previewProps} />
    ) : (
      <StepRenderer {...props} />
    );
  };

  const renderAllStepsAtOnce = () => {
    return (
      formState?.formSteps &&
      formState.formSteps.map((stepData: FormStep, index: number) => {
        const props = {
          key: `step${index}`,
          stepData: stepData,
          components: formState.components,
          formState: formState,
          stepIndex: index,
          handleChange: handleChange,
          handleSubmit: handleSubmit,
          handleBlur: handleBlur,
        };
        return getRenderer(stepData, props);
      })
    );
  };

  const renderOnlyActiveStep = () => {
    const activeStepData = formState?.formSteps
      ? formState?.formSteps[formState?.activeStep]
      : null;
    const props = {
      stepData: activeStepData,
      components: formState?.components,
      formState: formState,
      stepIndex: formState?.activeStep,
      handleChange: handleChange,
      handleSubmit: handleSubmit,
      handleBlur: handleBlur,
    };
    if (!activeStepData) return null;
    return getRenderer(activeStepData, props);
  };

  const StepNavigator: FormNavigationComponent =
    formState?.components?.stepnavigator || null;
  const renderStepsNavigator = () => {
    const steps = formState?.formSteps.map((step) =>  ({ title: step.title, valid:step.valid }));
    return (
      steps && (
        <StepNavigator
          onChange={handleChangeStep}
          data={{ steps, activeStep: formState.activeStep }}
        />
      )
    );
  };

  const FormWrapper = formState?.components?.formwrapper || null;

  return (
    <>
      {FormWrapper ? (
        <FormWrapper
          data={{
            steps: formState.formSteps,
            activeStep: formState.activeStep,
            stepData: formState?.formSteps[formState.activeStep],
            formTitle: formState.title
          }}
        >
          {renderStepsNavigator()}
          {showByStep ? renderOnlyActiveStep() : renderAllStepsAtOnce()}
        </FormWrapper>
      ) : (
        <>
          {renderStepsNavigator()}
          {showByStep ? renderOnlyActiveStep() : renderAllStepsAtOnce()}
        </>
      )}
    </>
  );
};

export default FormRenderer;
