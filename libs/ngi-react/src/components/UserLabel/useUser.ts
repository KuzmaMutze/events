import { useEffect, useState } from 'react';
import { UserData } from '@ngi/common';

export interface UseUserProps {
  getUser?: () => UserData | Promise<UserData>;
}

export const useUser = (props?: UseUserProps) => {
  const getUser = props?.getUser ?? fetchUserIdentity;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    isError,
    user,
  };
};

const fetchUserIdentity = async () => {
  try {
    return fetch('/auth/user')
      .then((res) => res.json())
      .then((data) => data as UserData);
  } catch (error) {
    console.log(error);
    throw new Error('Cannot get user');
  }
};
