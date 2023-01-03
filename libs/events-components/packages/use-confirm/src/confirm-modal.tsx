import { Button } from '@events-components/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from '@events-components/modal';
import { ConfirmOptions } from './useConfirm.types';

export interface ConfirmModalProps extends ConfirmOptions {
  onClose: () => void;
}

export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    title,
    description,
    onConfirm,
    onCancel,
    onClose,
    confirmButtonText,
    cancelButtonText,
    confirmButtonProps,
    cancelButtonProps,
  } = props;

  const confirm = () => {
    onConfirm?.();
    onClose();
  };

  const cancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        {description && <ModalBody>{description}</ModalBody>}
        <ModalFooter>
          <Button colorScheme="green" {...confirmButtonProps} onClick={confirm}>
            {confirmButtonText ?? 'Confirm'}
          </Button>
          {/* TODO: Change the subject to match the one in the figma */}
          <Button colorScheme="black" {...cancelButtonProps} onClick={cancel}>
            {cancelButtonText ?? 'Cancel'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
