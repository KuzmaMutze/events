import { CancelIcon } from '@events-components/icons';
import { Cell } from './cell';
import { NoDataContainer } from './grid-table.styled';

export const NoData = () => {
  return (
    <tbody>
      <tr>
        <Cell colSpan={99}>
          <NoDataContainer css={{ padding: '$16' }}>
            <CancelIcon size="xl" />
            No Data
          </NoDataContainer>
        </Cell>
      </tr>
    </tbody>
  );
};
