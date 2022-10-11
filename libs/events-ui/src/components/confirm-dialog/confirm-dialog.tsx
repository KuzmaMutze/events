import React, { useCallback, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '../alert-dialog';
import { Button, ButtonProps } from '../button';
import { ButtonGroup } from '../button-group';

export interface ConfirmDialogProps {
  title: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: ButtonProps['colorScheme'];
  cancelColorScheme?: ButtonProps['colorScheme'];
  isOpen: boolean;
  onClose: () => void;
  closeIsCancel?: boolean;
  disableClose?: boolean;
}

const defaultProps: Partial<ConfirmDialogProps> = {
  message: 'Are you sure?',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmColorScheme: 'green',
  cancelColorScheme: 'red',
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onCancel = useCallback(() => {
    props.onCancel?.();
    props.onClose();
  }, [props.onCancel, props.onClose]);

  const onConfirm = useCallback(() => {
    props.onConfirm?.();
    props.onClose();
  }, [props.onCancel, props.onConfirm]);

  const onClose = useCallback(() => {
    props.onClose();
    if (props.closeIsCancel) props.onCancel?.();
  }, [props.onClose, props.onCancel, props.closeIsCancel]);

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.disableClose ? () => null : onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{props.title}</AlertDialogHeader>
          <AlertDialogBody>{props.message}</AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button
                ref={cancelRef}
                onClick={onCancel}
                colorScheme={props.cancelColorScheme}
              >
                {props.cancelText}
              </Button>
              <Button
                onClick={onConfirm}
                colorScheme={props.confirmColorScheme}
              >
                {props.confirmText}
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

ConfirmDialog.defaultProps = defaultProps;
