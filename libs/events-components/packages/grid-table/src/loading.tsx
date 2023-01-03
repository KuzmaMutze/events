import { Loader } from '@events-components/loader';
import { Cell } from './cell';
import { Center } from './grid-table.styled';

export const Loading = () => {
  return (
    <tbody>
      <tr>
        <Cell colSpan={99}>
          <Center css={{ padding: '$16' }}>
            <Loader size="lg" color="black" />
          </Center>
        </Cell>
      </tr>
    </tbody>
  );
};
