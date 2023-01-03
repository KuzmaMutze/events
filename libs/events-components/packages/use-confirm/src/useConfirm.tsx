import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { ConfirmModal } from './confirm-modal';
import { OpenConfirmFn, ConfirmOptions } from './useConfirm.types';

export const ConfirmContext = createContext<OpenConfirmFn | undefined>(
  undefined
);

export const ConfirmProvider = (props: PropsWithChildren) => {
  const [modals, setModals] = useState<ConfirmOptions[]>([]);

  const { children } = props;

  const removeModal = (index: number) => {
    setModals((prevState) => prevState.filter((_, i) => i !== index));
  };

  const openConfirm: OpenConfirmFn = (options) => {
    setModals((prevState) => [...prevState, options]);
  };

  return (
    <ConfirmContext.Provider value={openConfirm}>
      {children}
      {modals.map((options, index) => {
        return (
          <ConfirmModal
            {...options}
            key={index}
            onClose={removeModal.bind(null, index)}
          />
        );
      })}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return context;
};
