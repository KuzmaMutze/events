import { useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import { TransferOption } from './types';
import { reorder as reorderFn } from './utils';

export interface UseTransferProps {
  options: TransferOption[];
  selected: string[];
  onChange?: (selected: string[]) => void;
}

export const useTransfer = (props: UseTransferProps) => {
  const [availableSearch, setAvailableSearch] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');

  const availableFuseRef = useRef(
    new Fuse<TransferOption>([], {
      keys: ['title', 'id'],
      isCaseSensitive: false,
    })
  );
  const selectedFuseRef = useRef(
    new Fuse<TransferOption>([], {
      keys: ['title', 'id'],
      isCaseSensitive: false,
    })
  );

  const [allAvailableOptions, allSelectedOptions] = useMemo(() => {
    const availableOptions = [...props.options];
    const selectedOptions = [];

    for (const selected of props.selected) {
      const index = availableOptions.findIndex(
        (option) => option.id === selected
      );
      if (index === -1) {
        console.warn('Selected contains item that cannot be found in options');
        continue;
      }
      const [item] = availableOptions.splice(index, 1);
      selectedOptions.push(item);
    }

    availableFuseRef.current.setCollection(availableOptions);
    selectedFuseRef.current.setCollection(selectedOptions);
    setAvailableSearch('');
    setSelectedSearch('');
    return [availableOptions, selectedOptions];
  }, [props.selected, props.options]);

  const availableOptions = useMemo(() => {
    if (!availableSearch) {
      return allAvailableOptions;
    }
    return availableFuseRef.current
      .search(availableSearch)
      .map((result) => result.item);
  }, [allAvailableOptions, availableSearch]);

  const selectedOptions = useMemo(() => {
    if (!selectedSearch) {
      return allSelectedOptions;
    }
    return selectedFuseRef.current
      .search(selectedSearch)
      .map((result) => result.item);
  }, [allSelectedOptions, selectedSearch]);

  const selectAll = () => {
    const availableIds = allAvailableOptions.map((item) => item.id);
    props.onChange?.(props.selected.concat(availableIds));
  };

  const deselectAll = () => {
    props.onChange?.([]);
  };

  const select = (id: string, index?: number) => {
    if (props.selected.includes(id)) {
      return;
    }
    if (index === undefined) {
      props.onChange?.(props.selected.concat(id));
      return;
    }
    props.onChange?.([
      ...props.selected.slice(0, index),
      id,
      ...props.selected.slice(index),
    ]);
  };

  const deselect = (id: string) => {
    props.onChange?.(props.selected.filter((item) => item !== id));
  };

  const reorder = (sourceIndex: number, targetIndex: number) => {
    if (!props.selected[sourceIndex] || !props.selected[targetIndex]) {
      return;
    }
    props.onChange?.(reorderFn(props.selected, sourceIndex, targetIndex));
  };

  const updateAvailableSearch = (search: string) => {
    setSelectedSearch('');
    setAvailableSearch(search);
  };

  const updateSelectedSearch = (search: string) => {
    setAvailableSearch('');
    setSelectedSearch(search);
  };

  return {
    availableOptions,
    selectedOptions,
    selectAll,
    deselectAll,
    select,
    deselect,
    reorder,
    availableSearch,
    updateAvailableSearch,
    selectedSearch,
    updateSelectedSearch,
  };
};
