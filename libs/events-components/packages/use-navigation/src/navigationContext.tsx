import { createContext, PropsWithChildren, useContext } from 'react';
import { useNavigation } from './useNavigation';

type NavigationContext = ReturnType<typeof useNavigation>;

const NavigationContext = createContext<NavigationContext | undefined>(
  undefined
);

export const NavigationProvider = (
  props: PropsWithChildren<NavigationContext>
) => {
  const { children, ...context } = props;

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};

// TODO: add warning if outside context
export const useNavigationContext = () => useContext(NavigationContext);
