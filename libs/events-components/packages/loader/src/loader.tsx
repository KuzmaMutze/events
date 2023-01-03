import {
  CircularProgress,
  CircularProgressProps,
} from '@events-components/circular-progress';

export type LoaderProps = Omit<CircularProgressProps, 'value'>;

export const Loader = (props: LoaderProps) => (
  <CircularProgress {...props} indeterminate />
);
