import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  Cell,
  Column,
  Columns,
  ColumnsRow,
  Details,
  ExpandableRow,
  ExpandCell,
  ExpandColumn,
  GridTable,
  Row,
  Rows,
  SelectableRow,
  SelectCell,
  SelectColumn,
  Sort as SortType,
} from '@events-components/grid-table';
import { styled } from '@events-components/theme';

export default {
  title: 'Data Display/GridTable',
  component: GridTable,
};

const generateData = (count = 10) => {
  return Array.from(Array(count), () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.random.numeric(2),
  }));
};

const smallData = generateData();
const largeData = generateData(100);

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '$32',
});

export const Basic = () => {
  return (
    <GridTable>
      <Columns>
        <ColumnsRow>
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {smallData.map((row, i) => (
          <Row key={i}>
            {Object.values(row).map((cell) => (
              <Cell key={cell}>{cell}</Cell>
            ))}
          </Row>
        ))}
      </Rows>
    </GridTable>
  );
};

export const NoDataExample = () => {
  return (
    <>
      <GridTable>
        <Columns>
          <ColumnsRow>
            <Column columnId="firstName">First Name</Column>
            <Column columnId="secondName">Second Name</Column>
            <Column columnId="age">Age</Column>
          </ColumnsRow>
        </Columns>
        <Rows></Rows>
      </GridTable>
    </>
  );
};

export const Sort = () => {
  const [sort, setSort] = useState<SortType | null>(null);

  const sortedData = useMemo(() => {
    if (!sort) {
      return smallData;
    }
    return [...smallData].sort((a, b) => {
      // @ts-ignore
      if (a[sort.columnId] > b[sort.columnId]) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      // @ts-ignore
      if (a[sort.columnId] < b[sort.columnId]) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }, [sort]);

  return (
    <GridTable sort={sort} onSort={setSort}>
      <Columns>
        <ColumnsRow>
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {sortedData.map((row, i) => (
          <Row key={i}>
            {Object.values(row).map((cell) => (
              <Cell key={cell}>{cell}</Cell>
            ))}
          </Row>
        ))}
      </Rows>
    </GridTable>
  );
};

export const Expandable = () => {
  return (
    <GridTable>
      <Columns>
        <ColumnsRow>
          <ExpandColumn />
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {smallData.map((row, i) => (
          <ExpandableRow key={i}>
            <Row>
              <ExpandCell />
              {Object.values(row).map((cell) => (
                <Cell key={cell}>{cell}</Cell>
              ))}
            </Row>
            <Details>
              <pre>{JSON.stringify(row, undefined, 2)}</pre>
            </Details>
          </ExpandableRow>
        ))}
      </Rows>
    </GridTable>
  );
};

export const StickyHeader = () => {
  return (
    <Container css={{ overflow: 'auto', height: 500 }}>
      <GridTable>
        <Columns sticky>
          <ColumnsRow>
            <Column columnId="firstName">First Name</Column>
            <Column columnId="secondName">Second Name</Column>
            <Column columnId="age">Age</Column>
          </ColumnsRow>
        </Columns>
        <Rows>
          {largeData.map((row, i) => (
            <Row key={i}>
              {Object.values(row).map((cell) => (
                <Cell key={cell}>{cell}</Cell>
              ))}
            </Row>
          ))}
        </Rows>
      </GridTable>
    </Container>
  );
};

export const Resizable = () => {
  const [sizes, setSizes] = useState({});

  return (
    <Container>
      <pre>{JSON.stringify(sizes, undefined, 2)}</pre>
      <GridTable sizes={sizes} onResize={setSizes}>
        <Columns>
          <ColumnsRow>
            <Column columnId="firstName" minWidth={160}>
              First Name
            </Column>
            <Column columnId="secondName" maxWidth={300}>
              Second Name Lorem ipsum dolor sit amet.
            </Column>
            <Column columnId="age" defaultWidth={500}>
              Age
            </Column>
          </ColumnsRow>
        </Columns>
        <Rows>
          {smallData.map((row, i) => (
            <Row key={i}>
              {Object.values(row).map((cell) => (
                <Cell key={cell}>{cell}</Cell>
              ))}
            </Row>
          ))}
        </Rows>
      </GridTable>
    </Container>
  );
};

export const DisableResize = () => {
  return (
    <GridTable disableResize>
      <Columns>
        <ColumnsRow>
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {smallData.map((row, i) => (
          <Row key={i}>
            {Object.values(row).map((cell) => (
              <Cell key={cell}>{cell}</Cell>
            ))}
          </Row>
        ))}
      </Rows>
    </GridTable>
  );
};

export const WithoutEmptyCellIndicator = () => {
  return (
    <GridTable showEmptyIndicator={false}>
      <Columns>
        <ColumnsRow>
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {smallData.map((row, i) => (
          <Row key={i}>
            {Object.values(row).map((cell) => (
              <Cell key={cell}>{Math.random() > 0.5 ? cell : null}</Cell>
            ))}
          </Row>
        ))}
      </Rows>
    </GridTable>
  );
};

export const Fixed = () => {
  return (
    <Container css={{ overflow: 'auto' }}>
      <GridTable fixed>
        <Columns>
          <ColumnsRow>
            <Column columnId="firstName">First Name</Column>
            <Column columnId="secondName">Second Name</Column>
            <Column columnId="age">Age</Column>
          </ColumnsRow>
        </Columns>
        <Rows>
          {smallData.map((row, i) => (
            <Row key={i}>
              {Object.values(row).map((cell) => (
                <Cell key={cell}>{cell}</Cell>
              ))}
            </Row>
          ))}
        </Rows>
      </GridTable>
    </Container>
  );
};

export const Loading = () => {
  return (
    <GridTable isLoading>
      <Columns>
        <ColumnsRow>
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {smallData.map((row, i) => (
          <Row key={i}>
            {Object.values(row).map((cell) => (
              <Cell key={cell}>{Math.random() > 0.5 ? cell : null}</Cell>
            ))}
          </Row>
        ))}
      </Rows>
    </GridTable>
  );
};

export const Selectable = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <GridTable selectedIds={selected} onSelectChange={setSelected}>
      <Columns>
        <ColumnsRow>
          <SelectColumn />
          <Column columnId="firstName">First Name</Column>
          <Column columnId="secondName">Second Name</Column>
          <Column columnId="age">Age</Column>
        </ColumnsRow>
      </Columns>
      <Rows>
        {smallData.map((row, i) => (
          <SelectableRow selectId={row.firstName + row.lastName} key={i}>
            <Row>
              <SelectCell />
              {Object.values(row).map((cell) => (
                <Cell key={cell}>{cell}</Cell>
              ))}
            </Row>
          </SelectableRow>
        ))}
      </Rows>
    </GridTable>
  );
};
