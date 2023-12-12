import React, { useEffect, useState } from "react";
import FormRenderer from "../components/FormRenderer";
import {
  FormContextValue,
  FormState,
  MultiStepFormProvider,
  formStateUpdate,
} from "../config/form-types";
import { getFieldState, getFormSate, getStepSate } from "./form-validator";
import { EVENT_TYPES, STEP_TYPE } from "../config/constants";

export const FormContext = React.createContext<FormContextValue | undefined>(
  undefined
);

const MultiStepFormGenerator: MultiStepFormProvider = ({
  formSteps,
  components,
  title,
  onSubmit,
  onChange,
  showByStep = true,
  previewTitle,
}) => {
  const [formState, setFormState] = useState<FormState>();

  useEffect(() => {
    initializeForm();
  }, []);

  const initializeForm = (): void => {
    // *************** Validate and attach the state of each field
    const allSteps = formSteps.map((formStep, stepIndex) => {
      const step = {
        ...formStep,
        fields: formStep.fields.map((field, fieldIndex) => ({
          ...field,
          state: getFieldState({
            validation: field.validation,
            fieldValue: field.value,
            eventType: EVENT_TYPES.initialize,
            isPristine: true,
            steps: formSteps,
            activeStepIndex: stepIndex,
            activeFieldIndex: fieldIndex,
          }),
          value: field?.value || "",
          initialValue: field.value,
        })),
      };
      // *************** Validate and attach the state of each step
      return { ...step, valid: getStepSate(step.fields) };
    });
    // *************** Validate and attach the state of the form
    if (previewTitle !== undefined) {
      allSteps.push({
        title: previewTitle,
        fields: [],
        valid: true,
        type: "PREVIEW",
      });
    }
    const isFormInitiallyValid = getFormSate(allSteps);
    // *************** allSteps = addPreviewStep
    setFormState(() => ({
      formSteps: allSteps,
      components,
      onChange,
      onSubmit,
      title,
      valid: isFormInitiallyValid,
      activeStep: 0,
    }));
  };

  const handleChangeStep = (step: number): void => {
    // *************** If same step is clicked, do nothing
    if (step === formState.activeStep || step < 0) return;
    const stepFields = formState.formSteps[formState.activeStep]?.fields || [];
    const isActiveStepValid = stepFields.every(
      (item) => (item as any).state.valid
    );
    // *************** Only allow user to change step, if the step selected
    // *************** is previous or the current step is valid
    if (
      (isActiveStepValid && step === formState.activeStep + 1) ||
      step < formState.activeStep
    ) {
      gotToStepX(step);
    }
  };

  const gotToNextStep = (): void => {
    if (formState.activeStep + 1 > formState.formSteps.length - 1) return;
    setFormState((prev) => ({ ...prev, activeStep: formState.activeStep + 1 }));
  };

  const gotToStepX = (step): void => {
    setFormState((prev) => ({ ...prev, activeStep: step }));
  };
  

  const handleSubmit = (): void => {
    // *********************** If last step and addPreview is true
    // *********************** creeate preview and add it to the steps
    // *********************** else move to next step
    const isLastStep = formState.activeStep === formState.formSteps.length - 1;
    if (isLastStep && formState.formSteps[formState.activeStep].type! == STEP_TYPE.preview) {
      const allSteps = formState.formSteps.slice(0, -1).map((item) => {
        const step = {
          title: item.title,
          fields: item.fields.map((field) => ({
            name: field.name,
            value: field.value,
          })),
        };
        return step;
      });

      onSubmit(allSteps);
      return;
    }
    if (formState.formSteps[formState.activeStep].valid) {
      isLastStep ? onSubmit(formState) : gotToNextStep();
    }
  };

  const handleChange: formStateUpdate = (
    param,
    stepIndex,
    fieldIndex
  ): void => {
    const newValue = typeof param === "string" ? param : param?.target?.value;
    setFormState((prevFormState) => {
      // *********************** Clone formSteps
      const formStepClone = [...prevFormState.formSteps];
      formStepClone[stepIndex] = { ...formStepClone[stepIndex], fields: [...formStepClone[stepIndex].fields]};

      // *********************** Update Clone
      const updatingField = formStepClone[stepIndex].fields[fieldIndex];
      formStepClone[stepIndex].fields[fieldIndex] = {
        ...updatingField,
        value: newValue,
        state: getFieldState({
          validation: updatingField.validation,
          fieldValue: newValue,
          eventType: EVENT_TYPES.change,
          isPristine: updatingField.initialValue === newValue,
          steps: formState.formSteps,
          activeStepIndex: stepIndex,
          activeFieldIndex: fieldIndex,
        }),
      };

      formStepClone[stepIndex].valid = getStepSate(
        formStepClone[stepIndex].fields
      );

      // *********************** Update state with Clone
      return {
        ...prevFormState,
        valid: getFormSate(formStepClone),
        formSteps: formStepClone,
      };
    });

    // *********************** Reset fields declared to be reset when active field changes
    const fieldsToReset =
      formState.formSteps[stepIndex]?.fields[fieldIndex]?.resets;
    if (fieldsToReset?.length) {
      formState.formSteps.map((step, indexOfStep) => {
        step.fields.map((field, indexOfField) => {
          if (fieldsToReset.includes(field.name)) {
            handleResetField(indexOfStep, indexOfField);
          }
        });
      });
      fieldsToReset.map;
    }
    onChange(param);
  };

  const handleBlur: formStateUpdate = (param, stepIndex, fieldIndex): void => {
    const newValue = typeof param === "string" ? param : param?.target?.value;

    setFormState((prevFormState) => {
      // *********************** Clone formSteps
      const formStepClone = [...prevFormState.formSteps];
      formStepClone[stepIndex] = {...formStepClone[stepIndex],  fields: [...formStepClone[stepIndex].fields]};

      // ********************* Update Clone
      const updatingField = formStepClone[stepIndex].fields[fieldIndex];
      formStepClone[stepIndex].fields[fieldIndex] = {
        ...updatingField,
        value: newValue,
        state: getFieldState({
          validation: updatingField.validation,
          fieldValue: newValue,
          eventType: EVENT_TYPES.blur,
          isPristine: updatingField.initialValue === newValue,
          steps: formState.formSteps,
          prevFieldState: updatingField.state,
          activeStepIndex: stepIndex,
          activeFieldIndex: fieldIndex,
        }),
      };

      //*********************** Update state with Clone
      return {
        ...prevFormState,
        formSteps: formStepClone,
      };
    });
  };

  const handleResetField = (stepIndex, fieldIndex) => {
    handleChange("", stepIndex, fieldIndex);
  };

  return (
    <FormContext.Provider
      value={{
        handleSubmit,
        handleChange,
        handleBlur,
        handleChangeStep,
        handleResetField,
        formState,
        showByStep,
      }}
    >
      <FormRenderer />
    </FormContext.Provider>
  );
};

export default MultiStepFormGenerator;
