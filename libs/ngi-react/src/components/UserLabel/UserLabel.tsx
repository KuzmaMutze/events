import React from 'react';
import { useUser, UseUserProps } from './useUser';

export interface UserLabelProps extends UseUserProps {}

export const UserLabel = (props: UserLabelProps) => {
  const { getUser } = props;

  const { user, isLoading, isError } = useUser({ getUser });
  return <p>{isLoading ? 'Loading...' : isError ? 'Error' : user?.name}</p>;
};
