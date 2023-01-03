import { createContext, PropsWithChildren, useContext } from 'react';

type NavBarContext = {
  expanded: boolean;
  onToggle: () => void;
};
const NavBarContext = createContext<NavBarContext | undefined>(undefined);

export const NavBarContextProvider = (
  props: PropsWithChildren<NavBarContext>
) => {
  return (
    <NavBarContext.Provider value={props}>
      {props.children}
    </NavBarContext.Provider>
  );
};

export const useNavBarContext = () => {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error('useNavBarContext must be within provider');
  }

  return context;
};
