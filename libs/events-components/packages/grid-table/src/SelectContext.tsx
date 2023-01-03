import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type SelectContext = {
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;

  register: (id: string) => () => void;

  someSelected: boolean;
  allSelected: boolean;
};

const SelectContext = createContext<SelectContext | undefined>(undefined);

export interface SelectContextProviderProps extends PropsWithChildren {
  selectedIds: string[];
  onSelect: (selectedIds: string[]) => void;
}

export const SelectContextProvider = (props: SelectContextProviderProps) => {
  const { selectedIds, onSelect: onSelectChange, children } = props;

  const [availableIds, setAvailableIds] = useState<string[]>([]);

  const onSelect = (id: string) => {
    if (!selectedIds.includes(id)) {
      onSelectChange([...selectedIds, id]);
      return;
    }
    onSelectChange(selectedIds.filter((selectedId) => selectedId !== id));
  };

  const register = useCallback((id: string) => {
    setAvailableIds((ids) => {
      if (ids.includes(id)) {
        console.warn(`${id} is already registered`);
        return ids;
      }
      return [...ids, id];
    });
    return () => {
      setAvailableIds((ids) => {
        if (!ids.includes(id)) {
          console.warn(`${id} is not registered`);
          return ids;
        }
        return ids.filter((selectedId) => selectedId != id);
      });
    };
  }, []);

  const allSelected = useMemo(() => {
    if (availableIds.length === 0) {
      return false;
    }
    return availableIds.every((id) => selectedIds.includes(id));
  }, [selectedIds, availableIds]);
  const someSelected = useMemo(() => {
    if (availableIds.length === 0) {
      return false;
    }
    return availableIds.some((id) => selectedIds.includes(id));
  }, [selectedIds, availableIds]);

  const onSelectAll = () => {
    if (allSelected) {
      onSelectChange(selectedIds.filter((id) => !availableIds.includes(id)));
    } else {
      onSelectChange([
        ...selectedIds,
        ...availableIds.filter((id) => !selectedIds.includes(id)),
      ]);
    }
  };

  return (
    <SelectContext.Provider
      value={{
        selectedIds,
        onSelect,
        register,
        onSelectAll,
        allSelected,
        someSelected,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be within provider');
  }
  return context;
};

export const useRegisterSelect = (selectId: string) => {
  const { register } = useSelectContext();

  useEffect(() => {
    const unregister = register(selectId);
    return unregister;
  }, [selectId]);
};
