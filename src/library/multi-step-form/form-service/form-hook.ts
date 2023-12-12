import React from 'react';
import { FormContext } from './form-context';
export const useForm = ():any => React.useContext(FormContext);
