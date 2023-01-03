import { Button } from '@events-components/button';
import { AddIcon } from '@events-components/icons';
import { styled } from '@events-components/theme';

const Row = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
  flexWrap: 'wrap',
});

const Basic = () => <Button>{"I'm Button"}</Button>;

const WithIcons = () => {
  return (
    <>
      <Button>
        <AddIcon />
        Button name
      </Button>
      <Button>
        Button name
        <AddIcon />
      </Button>
      <Button>
        <AddIcon />
        Button name
        <AddIcon />
      </Button>
      <></>
      <Button>
        <AddIcon size="sm" />
        Button name
      </Button>
      <Button>
        Button name
        <AddIcon size="sm" />
      </Button>
      <Button>
        <AddIcon size="sm" />
        Button name
        <AddIcon size="sm" />
      </Button>
    </>
  );
};

const ColorScheme = () => {
  return (
    <Row>
      <Button colorScheme="green">Button name</Button>
      <Button colorScheme="black">Button name</Button>
      <Button colorScheme="white">Button name</Button>
      <Button colorScheme="blue">Button name</Button>
      <Button colorScheme="red">Button name</Button>
    </Row>
  );
};

const Shadow = () => {
  return (
    <Row>
      <Button colorScheme="green" shadow>
        Button name
      </Button>
      <Button colorScheme="black" shadow>
        Button name
      </Button>
      <Button colorScheme="white" shadow>
        Button name
      </Button>
      <Button colorScheme="blue" shadow>
        Button name
      </Button>
      <Button colorScheme="red" shadow>
        Button name
      </Button>
    </Row>
  );
};

const Disabled = () => {
  return (
    <Row>
      <Button colorScheme="green" disabled>
        Green
      </Button>
      <Button colorScheme="black" disabled>
        Black
      </Button>
      <Button colorScheme="white" disabled>
        White
      </Button>
      <Button colorScheme="blue" disabled>
        Blue
      </Button>
      <Button colorScheme="red" disabled>
        Red
      </Button>
    </Row>
  );
};

const Sizes = () => {
  return (
    <Row>
      <Button size="sm">Button name</Button>
      <Button size="md">Button name</Button>
      <Button size="lg">Button name</Button>
    </Row>
  );
};

const Loading = () => {
  return (
    <Row>
      <Button colorScheme="green" isLoading>
        Green
      </Button>
      <Button colorScheme="red" isLoading>
        Red
      </Button>
      <Button colorScheme="white" isLoading>
        White
      </Button>
    </Row>
  );
};

const As = () => {
  return (
    <Button as="a" href="https://google.com" target="_blank">
      Link
    </Button>
  );
};

export default {
  Basic,
  WithIcons,
  ColorScheme,
  Shadow,
  Disabled,
  Sizes,
  Loading,
  As,
};
