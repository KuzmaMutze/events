import { useMemo } from 'react';
import { useRole } from './RolesProvider';

export const useAble = <T = string>(permission: T) => {
  const role = useRole<T>();

  return useMemo(() => role.able(permission), [permission, role]);
};
