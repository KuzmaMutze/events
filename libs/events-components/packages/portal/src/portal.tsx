import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps extends PropsWithChildren {
  container?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
  const { container = document.body, children } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <>{isMounted ? createPortal(children, container) : null}</>;
};
