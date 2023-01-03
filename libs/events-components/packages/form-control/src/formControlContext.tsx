import { createContext, PropsWithChildren, useContext } from 'react';

export interface FormControlContext {
  isInvalid: boolean;
  isRequired: boolean;
  isValid: boolean;
}

const FormControlContext = createContext<FormControlContext>({
  isInvalid: false,
  isRequired: false,
  isValid: false,
});

export const FormControlContextProvider = (
  props: PropsWithChildren<Partial<FormControlContext>>
) => {
  return (
    <FormControlContext.Provider
      value={{
        isInvalid: props.isInvalid ?? false,
        isRequired: props.isRequired ?? false,
        isValid: props.isValid ?? false,
      }}
    >
      {props.children}
    </FormControlContext.Provider>
  );
};

export const useFormControlContext = (
  props?: Partial<FormControlContext>
): FormControlContext => {
  const context = useContext(FormControlContext);
  return {
    isInvalid: props?.isInvalid ?? context.isInvalid,
    isRequired: props?.isRequired ?? context.isRequired,
    isValid: props?.isValid ?? context.isValid,
  };
};
