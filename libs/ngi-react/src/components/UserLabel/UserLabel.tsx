import React from 'react';
import { Paragraph, ParagraphProps, Skeleton } from 'events-components';
import { useUser, UseUserProps } from './useUser';

export interface UserLabelProps extends UseUserProps, ParagraphProps {}

export const UserLabel = (props: UserLabelProps) => {
  const { getUser, ...paragraphProps } = props;

  const { user, isLoading, isError } = useUser({ getUser });
  return (
    <Skeleton isLoaded={!isLoading} {...paragraphProps}>
      <Paragraph>
        {isLoading ? 'Loading...' : isError ? 'Error' : user?.name}
      </Paragraph>
    </Skeleton>
  );
};
