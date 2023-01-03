import { useMemo, useState } from 'react';
import { Transfer } from './transfer';
import { TransferOption } from './types';

export default {
  title: 'Inputs/Transfer',
  component: Transfer,
};

const transferOptions = [
  { id: '1', title: 'Option 1 a' },
  { id: '2', title: 'Option 2' },
  { id: '3', title: 'Option 3' },
  { id: '4', title: 'Option 4' },
  { id: '5', title: 'Option 5 a' },
  { id: '6', title: 'Option 6' },
  { id: '7', title: 'Option 7 a' },
  { id: '8', title: 'Option 8' },
  { id: '9', title: 'Option 9' },
];

export const Basic = () => {
  const options: TransferOption[] = useMemo(() => transferOptions, []);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Transfer
      options={options}
      hideSearch
      selected={selected}
      onChange={setSelected}
    />
  );
};
export const withSearch = () => {
  const options: TransferOption[] = useMemo(() => transferOptions, []);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Transfer options={options} selected={selected} onChange={setSelected} />
  );
};
