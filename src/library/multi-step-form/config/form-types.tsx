// ------------------ FORM DATA DEFINTION -------------------------
import { ReactNode } from "react";
export interface FieldState {
  pristine: boolean;
  touched: boolean;
  untouched: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
}

export interface FormValidation {
  min?: number;
  max?: number;
  required?: boolean;
  pattern?: RegExp;
  matchWith?: string;
  customValidator?: (field: any, activeStep: any, steps: any) => boolean;
}

export interface FormErrortext {
  text: string;
  show: boolean;
}

export interface FormHelpertext {
  text: string;
  show: boolean;
}

export interface HelperTex {
  text: string;
}

export type FormComponents = {
  text: InputTextComponent;
  password: InputPasswordComponent | InputComponent;
  typeahead: TypeAheadComponent;
  button: FormButtonComponent;
  errortext: FormErrortextComponent;
  helpertext: FormHelpertextComponent;
  stepnavigator: FormNavigationComponent;
  stepwrapper: FormStepWrapperComponent;
  previewwrapper: FormPreviewWrapperComponent;
  previewlabel: FormPreviewLabelComponent;
  formwrapper: FormHeaderComponent;
  number: InputNumberComponent | InputComponent;
};

export type FormFieldKeys = keyof FormComponents;

export interface BaseFormField {
  name: string;
  placeholder: string;
  disabled: boolean;
  value?: string | number;
  defaultValue?: string;
  type: FormFieldKeys;
  label?: string;
  validation?: FormValidation;
  helperText?: string;
  errorText?: string;
  customValidator?: (param: any) => void;
  state?: any;
  resets?: string[];
}

export interface InputText extends BaseFormField {
  type: "text";
  index?: number;
}

export interface InputNumber extends BaseFormField {
  type: "number";
  index?: number;
}

export interface InputPassword extends BaseFormField {
  type: "password";
}

export interface Typeahead extends BaseFormField {
  type: "typeahead";
  optionsKey: string;
  dataSourceUrl?: string;
  listArray?: { name: string; icon?: SvgIconType; image?: string }[];
}

type StepType = "FORM" | "PREVIEW" | "DEFAULT";
export interface FormStep {
  title: string;
  fields: (InputText | InputPassword | Typeahead | InputNumber)[];
  customValidator?: (param: any) => boolean;
  valid?: boolean;
  type?: StepType;
}

export interface PreviewStep {
  title: string;
  type?: StepType;
  fields?: never;
}

export interface Button {
  disabled: boolean;
  text?: string;
}

export interface Navigation {
  onClick: (value) => void;
  disabled: boolean;
}
export interface FormContextValue {
  formState: FormState;
  showByStep: boolean;
  handleSubmit: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    stepIndex: number,
    fieldName: string
  ) => void;
  handleBlur: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    stepIndex: number,
    fieldName: string
  ) => void;
  handleResetField: (
    e: React.ChangeEvent<HTMLInputElement>,
    stepIndex: number,
    fieldName: string
  ) => void;
  handleChangeStep: (param: number) => void;
}

export type formStateUpdate = (
  e: React.ChangeEvent<HTMLInputElement> | string,
  stepIndex: number,
  fieldName: string
) => void;

// --------------------------------------------- COMPONENT TYPES DEFINITION  -------------------------------------
interface FieldEvents {
  onChange: (param: any) => void;
  onBlur: (param: any) => void;
}
type SvgIconType = React.FC<React.SVGProps<SVGSVGElement>>;

export type InputTextComponent = React.FC<
  { data: InputText } & FieldEvents & { [key: string]: any }
>;
export type InputComponent = React.FC<
  { data: BaseFormField } & FieldEvents & { [key: string]: any }
>;

export type InputNumberComponent = React.FC<
  { data: InputNumber } & FieldEvents & { [key: string]: any }
>;

export type InputPasswordComponent = React.FC<
  { data: InputPassword } & FieldEvents & { [key: string]: any }
>;

export type TypeAheadComponent = React.FC<
  { data: Typeahead } & FieldEvents & { [key: string]: any }
>;

export type FormErrortextComponent = React.FC<{
  data: FormErrortext;
  [key: string]: any;
}>;

export type FormHelpertextComponent = React.FC<{
  data: FormHelpertext;
  [key: string]: any;
}>;

export type FormButtonComponent = React.FC<{
  data: Button;
  onClick: (param: any) => void;
  [key: string]: any;
}>;

export type FormNavigationComponent = React.FC<{
  data: { activeStep: number; steps: { title: string, valid: boolean }[] };
  onChange: (param: number) => void;
}>;

export type FormStepWrapperComponent = React.FC<{
  children: ReactNode;
  data: { stepTitle?: string; formTitle?: string };
}>;

export type FormPreviewWrapperComponent = React.FC<{ children: ReactNode }>;

export type FormPreviewLabelComponent = React.FC<{
  data: { value: string; label: string };
  [key: string]: any;
}>;

export type FormHeaderComponent = React.FC<{
  data: { stepData: FormStep; steps: FormStep[] };
  [key: string]: any;
}>;

export type FieldComponents = Partial<Record<FormFieldKeys, React.FC<any>>>;

export interface MultiStepFormProps {
  title: string;
  formSteps: (FormStep | PreviewStep)[];
  components: FieldComponents;
  onSubmit: (param: any) => void;
  onChange: (param: any) => void;
  valid?: boolean;
  showByStep?: boolean;
  previewTitle?: string;
}

export interface FormState {
  title: string;
  formSteps: FormStep[];
  components: FieldComponents;
  valid?: boolean;
  activeStep?: number;
  showByStep?: boolean;
}

export type MultiStepFormProvider = React.FC<MultiStepFormProps>;
