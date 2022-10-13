import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Profile } from '@ngi/common';
import {
  Atom,
  PrimitiveAtom,
  useAtom,
  useAtomValue,
  WritableAtom,
} from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import {
  fetchDefaultUserProfile,
  getUserProfileFromLocalStorage,
  saveUserProfileToLocalStorage,
  upgradeUserProfile,
} from '@/lib';
import { useColorMode } from '@events/events-ui';

const UserProfileLoadingContext = createContext<boolean | undefined>(undefined);

export interface UserProfileProviderProps<AppName extends string, T> {
  children: ReactNode;
  appName: AppName;
  fullProfileAtom: PrimitiveAtom<any>;
}

export function UserProfileProvider<AppName extends string, T extends {}>({
  children,
  appName,
  fullProfileAtom,
}: UserProfileProviderProps<AppName, T>) {
  type FullProfile = Profile<AppName, T>;
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useAtom(fullProfileAtom);

  useEffect(() => {
    (async () => {
      try {
        const localProfile = getUserProfileFromLocalStorage<FullProfile>();
        if (localProfile) {
          const upgradedProfile = await upgradeUserProfile(localProfile);
          setProfile(upgradedProfile);
        } else {
          setProfile(await fetchDefaultUserProfile());
        }
      } catch (error) {
        throw new Error("Couldn't load user settings. Please try again later");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    (async () => {
      saveUserProfileToLocalStorage(profile);
    })();
  }, [profile]);

  return (
    <UserProfileLoadingContext.Provider value={isLoading}>
      {!isLoading && <ProfileSyncer atom={fullProfileAtom} />}
      {children}
    </UserProfileLoadingContext.Provider>
  );
}

export const useUserProfileLoading = () => {
  const ctx = useContext(UserProfileLoadingContext);
  if (ctx === undefined) return true;
  return ctx;
};

export function useResetProfileToDefault(atom: WritableAtom<any, any>) {
  const setProfile = useUpdateAtom(atom);
  return async () => {
    setProfile(await fetchDefaultUserProfile());
  };
}

export interface ProfileSyncerProps {
  atom: Atom<Profile<any, any>>;
}

const ProfileSyncer = (props: ProfileSyncerProps) => {
  const { atom } = props;
  const { common } = useAtomValue(atom);

  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode(common.theme);
  }, [common.theme]);

  return null;
};
