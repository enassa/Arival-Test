import { REGEX_PATTERN } from "../library/multi-step-form/config/constants";
import { FormStep } from "./../library/multi-step-form/config/form-types";
export const USER_FORM: FormStep[] = [
  {
    title: "Initial info",
    fields: [
      {
        name: "userName",
        placeholder: "Input username",
        label: "Username",
        type: "text",
        disabled: false,
        validation: {
          min: 4,
          max: 12,
          pattern: REGEX_PATTERN.userName,
          required: true,
        },
        helperText: "Username must be 4 to 12 characters long",
        errorText: "Username is invalid",
      },
      {
        name: "email",
        placeholder: "Input email",
        label: "Email",
        type: "text",
        disabled: false,
        validation: {
          required: true,
          pattern: REGEX_PATTERN.email,
        },
        helperText: "Email must be of format ab@domain.tld",
        errorText: "Email is invalid",
      },
      {
        name: "phone",
        placeholder: "Phone",
        label: "Phone",
        type: "number",
        disabled: false,
        validation: {
          min: 10,
          max: 12,
          required: true,
          pattern: REGEX_PATTERN.phone,
        },
        errorText: "Phone is invalid",
        helperText: "Phone must be 10 to 12 characters long",
      },
      {
        name: "country",
        placeholder: "Select country",
        label: "Country",
        type: "typeahead",
        disabled: false,
        dataSourceUrl: 'https://restcountries.com/v3.1/all',
        validation: {
          required: true
        },
        errorText: "Country is required",
        listArray: [{ name: "Ghana" }, { name: "Togo" }, { name: "USA" }],
        optionsKey: "name",
      },
    ],
  },
  {
    title: "Password screen",
    fields: [
      {
        name: "password",
        placeholder: "Input password",
        label: "Password",
        type: "password",
        disabled: false,
        validation: {
          min: 8,
          max: 16,
          required: true,
        },
        helperText: "Password must be 8 to 16 characters long",
        errorText: "Your password is invalid",
        resets: ["confirmPassword"],
      },
      {
        name: "confirmPassword",
        placeholder: "Repeat password",
        label: "Repeat password",
        type: "password",
        disabled: false,
        validation: {
          min: 8,
          max: 16,
          required: true,
          matchWith: "password",
        },
        errorText: "Password do not match",
      },
    ],
  },
];
