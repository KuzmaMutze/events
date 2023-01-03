import { Children, isValidElement } from 'react';
import { childrenToString } from '@events-components/react-utils';
import { DropdownOption } from './types';

export const findOption = (options: DropdownOption[], value: string | null) => {
  return options.find((option) => option.value === value);
};

export const childrenToOption = (children: React.ReactNode) => {
  return Children.toArray(children).reduce<DropdownOption[]>((arr, element) => {
    if (!isValidElement(element)) {
      return arr;
    }
    if (typeof element.props.value !== 'string') {
      throw new Error(
        'Value not found. Children must contain only DropdownItems with value.'
      );
    }
    arr.push({
      value: element.props.value,
      text: childrenToString(element),
    });
    return arr;
  }, []);
};
