import { AriaAttributes } from 'react';
import {
  FormControlContext,
  useFormControlContext,
} from './formControlContext';
import { FormControlControlProps } from './types';

/**
 * Generates aria attributes based on form control context.
 *
 * - aria-invalid - true if the form control is invalid, false if it is valid, undefined if it is neither.
 * - aria-required - true if the form control is required, undefined if it is neither.
 */
export const getFormAriaAttributes = (
  context: FormControlContext
): Pick<AriaAttributes, 'aria-invalid' | 'aria-required'> => {
  return {
    'aria-invalid': context.isInvalid
      ? true
      : context.isValid
      ? false
      : undefined,
    'aria-required': context.isRequired ? true : undefined,
  };
};

/**
 * Generates aria attributes based on form control context.
 *
 * {@link  getFormAriaAttributes}
 */
export const useFormAriaAttributes = (props: FormControlControlProps) => {
  const context = useFormControlContext(props);
  return getFormAriaAttributes(context);
};
