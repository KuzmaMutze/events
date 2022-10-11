import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { PartialByKeys } from '@/utils/typeUtils';
import { nanoid } from 'nanoid';
import { ConfirmDialog, ConfirmDialogProps } from './confirm-dialog';

type Dialog = PartialByKeys<Omit<ConfirmDialogProps, 'isOpen'>, 'onClose'>;
type Dialogs = Record<string, Dialog>;

interface ConfirmDialogContext {
  setIds: Dispatch<SetStateAction<string[]>>;
  dialogsRef: React.MutableRefObject<Dialogs>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContext | undefined>(
  undefined
);

export interface ConfirmDialogProviderProps {
  children?: ReactNode;
}

export const ConfirmDialogProvider = ({
  children,
}: ConfirmDialogProviderProps) => {
  const dialogsRef = useRef<Dialogs>({});
  const [ids, setIds] = useState<string[]>([]);

  return (
    <ConfirmDialogContext.Provider value={{ dialogsRef, setIds }}>
      {children}
      {ids.map((id) => (
        <ConfirmDialog isOpen {...dialogsRef.current[id]} key={id} />
      ))}
    </ConfirmDialogContext.Provider>
  );
};

export type ConfirmResult = 'confirm' | 'cancel' | 'close';

export const useConfirm = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context)
    throw new Error(
      'useConfirm needs to be used inside ConfirmDialogProvider!'
    );

  const { dialogsRef, setIds } = context;

  return useCallback(
    (props: Dialog) => {
      return new Promise<ConfirmResult>((res) => {
        const id = nanoid();
        const onClose = () => {
          props.onClose?.();
          res('close');
          setIds((ids) => ids.filter((x) => x !== id));
          delete dialogsRef.current[id];
        };
        dialogsRef.current[id] = {
          ...props,
          onClose,
          onConfirm: () => {
            props.onConfirm?.();
            res('confirm');
          },
          onCancel: () => {
            props.onCancel?.();
            res('cancel');
          },
        };
        setIds((ids) => [...ids, id]);
      });
    },
    [setIds]
  );
};
