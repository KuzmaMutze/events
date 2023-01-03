import {
  ComponentPropsWithRef,
  forwardRef,
  useLayoutEffect,
  useRef,
} from 'react';
import {
  FormControlControlProps,
  useFormAriaAttributes,
} from '@events-components/form-control';
import { clsx } from '@events-components/theme';
import { useMergeRefs } from '@events-components/use-merge-refs';
import { checkbox, CheckboxVariants } from './checkbox.styled';

export interface CheckboxProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'>,
    CheckboxVariants,
    FormControlControlProps {
  isIndeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      isInvalid,
      isValid,
      isIndeterminate,
      size,
      className,
      ...checkboxProps
    } = props;

    const aria = useFormAriaAttributes({ isInvalid, isValid });

    const inputRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
      if (!inputRef.current) {
        return;
      }
      if (isIndeterminate) {
        inputRef.current.indeterminate = true;
        inputRef.current.checked = true;
      } else {
        inputRef.current.indeterminate = false;
      }
    }, [isIndeterminate]);

    const refs = useMergeRefs(ref, inputRef);

    return (
      <input
        {...aria}
        type="checkbox"
        {...checkboxProps}
        className={clsx('checkbox', checkbox({ size }).toString(), className)}
        ref={refs}
      />
    );
  }
);
