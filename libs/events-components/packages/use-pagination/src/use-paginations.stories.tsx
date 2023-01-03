import React, { useState } from 'react';
import { Button } from '@events-components/button';
import { Input } from '@events-components/input';
import { styled } from '@events-components/theme';
import { usePagination } from '@events-components/use-pagination';

export default {
  title: 'Hooks/usePagination',
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
});

const PaginationButton = styled('button', {
  cursor: 'pointer',
  userSelect: 'none',
  minWidth: '$24',
  borderRadius: '$sm',
  borderColor: 'transparent',
  color: '$gray6',
  padding: '$4',
  '&:disabled': {
    backgroundColor: '$gray8',
    cursor: 'default',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$green',
        color: '$white',
      },
    },
  },
});

const PaginationContainer = styled(Container, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
});

const StyledInput = styled(Input, {
  width: '$32',
  padding: '$4',
  textAlign: 'center',
});

export const Basic = () => {
  const {
    items,
    handleNext,
    handlePrev,
    currentPage,
    handleChangePage,
    canNext,
    canPrev,
  } = usePagination({ totalPages: 20 });

  const handleInputPage = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChangePage(e.target.value);

  return (
    <Container>
      <PaginationContainer>
        <Button onClick={handlePrev} disabled={!canPrev}>
          BACK
        </Button>
        <StyledInput value={currentPage} onChange={handleInputPage} />
        <Button onClick={handleNext} disabled={!canNext}>
          NEXT
        </Button>
      </PaginationContainer>
      <PaginationContainer>
        {items.map(({ value, isCurrent, isDisabled, onSelect }, idx) => (
          <PaginationButton
            key={idx}
            onClick={onSelect}
            disabled={isDisabled}
            active={isCurrent}
          >
            {value}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </Container>
  );
};

export const LessThan8Pages = () => {
  const { items, handleNext, handlePrev, currentPage, handleChangePage } =
    usePagination({ totalPages: 7 });

  const handleInputPage = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChangePage(e.target.value);

  return (
    <Container>
      <PaginationContainer>
        <Button onClick={handlePrev}>BACK</Button>
        <StyledInput value={currentPage} onChange={handleInputPage} />
        <Button onClick={handleNext}>NEXT</Button>
      </PaginationContainer>
      <PaginationContainer>
        {items.map(({ value, isCurrent, isDisabled, onSelect }, idx) => (
          <PaginationButton
            key={idx}
            onClick={onSelect}
            disabled={isDisabled}
            active={isCurrent}
          >
            {value}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </Container>
  );
};

export const Controlled = () => {
  const [index, setIndex] = useState(5);
  const { items } = usePagination({
    totalPages: 20,
    pageIndex: index,
    onPageChange: setIndex,
  });

  return (
    <Container>
      <Button
        onClick={() => {
          setIndex(Math.floor(Math.random() * 20));
        }}
      >
        Random page
      </Button>
      <PaginationContainer>
        {items.map(({ value, isCurrent, isDisabled, onSelect }, idx) => (
          <PaginationButton
            key={idx}
            onClick={onSelect}
            disabled={isDisabled}
            active={isCurrent}
          >
            {value}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </Container>
  );
};
