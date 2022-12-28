import { PropsWithChildren, useEffect } from 'react';

// import { globalStyles } from './packages/theme/dist';

export default ({ children }: PropsWithChildren) => {
  useEffect(() => {
    // globalStyles();
  }, []);

  return children;
};
