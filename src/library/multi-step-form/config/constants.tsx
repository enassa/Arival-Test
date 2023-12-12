export const DEFAULT_STATES = {
  pristine: true, //The field has not been modified yet,
  touched: false, //The field has been touched,
  untouched: true, //The field has not been touched yet,
  dirty: false, //The field has been modified,
  valid: true, // The field value is valid,
  invalid: false, // "The field is invalid,
};

export const EVENT_TYPES = {
  change: "VALUE CHANGING EVENT",
  blur: "NON VALUE CHANGING EVENT",
  initialize: "INITIALIZE FORM EVENT",
};

export const RENDERERS = {
  step: "FORM STEP",
  preview: "PREVIEW STEP",
  info: "INFO STEP",
  stepNavigator: 'STEP NAVIGATOR'
};

export const STEP_TYPE = {
  preview: 'PREVIEW',
  form: 'FORM',
  default: 'FORM'
}

export const ERROR_TYPES = {
  min: 'MIN',
  max: 'MAX',
  required: 'REQUIRED',
  pattern: 'PATTERN',
  custom: 'CUSTOM',
  matchWith: 'MATCH_WIDTH'
}

export const REGEX_PATTERN = {
  userName: /^[a-zA-Z0-9_-\s]+$/,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  phone: /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,10}[-.\s]?\d{1,10}$/
}