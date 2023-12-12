import { EVENT_TYPES, DEFAULT_STATES, ERROR_TYPES } from "../config/constants";

const validateRegexPattern = (myString, pattern) => {
  const regex = new RegExp(pattern);
  const regexState = regex.test(myString);
  return regexState;
};

export const validateField = (dataForValidation) => {
  const { validation, fieldValue, activeFieldIndex, activeStepIndex, steps } =  dataForValidation;
  const activeStep = steps[activeStepIndex];
  const field = activeStep.fields[activeFieldIndex];
  const errors = [];

  if (validation?.matchWith) {
    const fieldToMatch = steps
      .flatMap((item) => item.fields)
      .find((item) => item.name === validation.matchWith);

    const isInValid = fieldToMatch?.value !== fieldValue;
    isInValid && errors.push(ERROR_TYPES.matchWith);
  }

  if (validation?.customValidator) {
    const isInValid = !validation.customValidator(field, activeStep, steps);
    console.log(isInValid);
    isInValid && errors.push(ERROR_TYPES.custom);
  }

  if (validation?.required && !fieldValue) {
    errors.push(ERROR_TYPES.required);
  }

  if (validation?.pattern) {
    const isInValid = !validateRegexPattern(fieldValue, validation.pattern);
    isInValid && errors.push(ERROR_TYPES.pattern);
  }

  if (validation?.min) {
    const isInValid = fieldValue.length < validation.min;
    isInValid && errors.push(ERROR_TYPES.min);
  }

  if (validation?.max) {
    const isInValid = fieldValue.length > validation.max;
    isInValid && errors.push(ERROR_TYPES.max);
  }

  return {
    errors,
    valid: !errors.length,
    invalid: !!errors.length,
  };
};

export const getFieldState = (dataForValidation) => {
  const { validation, fieldValue, eventType, isPristine, prevFieldState } =  dataForValidation;
  // *************** If there is no prefilled value for the field and it is not required,
  // *************** then there is no need to validate it intitially
  if (
    eventType === EVENT_TYPES.initialize &&
    !fieldValue &&
    !validation.required
  ) {
    return DEFAULT_STATES;
  }
  // *************** If there is no prefilled value for the field and it is  required,
  // *************** then make it invalid
  if (eventType === EVENT_TYPES.initialize && !fieldValue && validation.required) {
    return { ...DEFAULT_STATES, valid: false, invalid: true };
  }

  let state = {};

  // *************** Initial form load validation;
  if (eventType === EVENT_TYPES.initialize) {
    state = {
      ...DEFAULT_STATES,
      ...validateField(dataForValidation),
    };
    return state;
  }

  // *************** Validation for value changing events
  if (eventType === EVENT_TYPES.change) {
    state = {
      ...validateField(dataForValidation),
      pristine: isPristine,
      dirty: !isPristine,
    };
    return state;
  }

  if (eventType === EVENT_TYPES.blur) {
    state = {
      ...prevFieldState,
      ...validateField(dataForValidation),
      touched: true,
      untouched: false,
    };
  }
  return state;
};

export const getStepSate = (stepFields) => {
  return stepFields.every((item) => item.state.valid === true);
};

export const getFormSate = (steps) => {
  return steps.flatMap((item) => item.fields).every((item) => item.state.valid);
};
