import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IRole } from '@aam/core';

const RoleContext = createContext<IRole | undefined>(undefined);

export interface RoleProviderProps {
  role: IRole;
}

export const RoleProvider = (props: PropsWithChildren<RoleProviderProps>) => {
  const [role, setRole] = useState<IRole>(props.role);
  useEffect(() => {
    setRole(props.role);
  }, [props.role]);

  return (
    <RoleContext.Provider value={role}>{props.children}</RoleContext.Provider>
  );
};

export const useRole = <T extends unknown = string>() => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useUpdateRole must be within provider');
  }
  return context as IRole<T>;
};
