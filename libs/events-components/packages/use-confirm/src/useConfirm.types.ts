import { ReactNode } from 'react';
import { ButtonProps } from '@events-components/button';

export interface ConfirmOptions {
  title: ReactNode;
  description?: ReactNode;
  confirmButtonProps?: Omit<ButtonProps, 'onClick'>;
  cancelButtonProps?: Omit<ButtonProps, 'onClick'>;
  confirmButtonText?: ReactNode;
  cancelButtonText?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export type OpenConfirmFn = (options: ConfirmOptions) => void;
