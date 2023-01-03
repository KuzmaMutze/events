import {
  CircularProgress as CircularProgressComponent,
  CircularProgressProps,
} from '@events-components/circular-progress';

const CircularProgress = (props: CircularProgressProps & { text?: string }) => {
  return (
    <CircularProgressComponent {...props}>
      {props.text}
    </CircularProgressComponent>
  );
};

export default {
  title: 'Data Display/CircularProgress',
  component: CircularProgress,
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    size: {
      control: {
        type: 'select',
        optional: ['sm', 'lg'],
      },
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['green', 'white', 'black'],
      },
    },
    text: {
      control: {
        type: 'text',
      },
    },
  },
};

export const Basic = {
  value: 0.6,
  size: 'sm',
  colorScheme: 'green',
  indeterminate: false,
  text: undefined,
};
export { Basic as CircularProgress };
