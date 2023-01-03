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
  fetchUserProfile,
  getUserProfileFromLocalStorage,
  saveUserProfileToLocalStorage,
  saveUserProfileToRemote,
  upgradeUserProfile,
} from '@/lib';
import { useColorMode } from 'events-components';

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
        const localProfile =
          (await getUserProfileFromLocalStorage()) as FullProfile;
        if (localProfile) {
          setProfile(await upgradeUserProfile(localProfile));
        } else {
          setProfile(await fetchUserProfile());
        }
      } catch (error) {
        console.warn("Couldn't load profile from remote");

        const localProfile = getUserProfileFromLocalStorage<FullProfile>();
        if (localProfile) setProfile(await upgradeUserProfile(localProfile));
        else {
          const defaultProfile = await fetchDefaultUserProfile();
          setProfile(defaultProfile);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    (async () => {
      saveUserProfileToLocalStorage(profile);
      try {
        const result = await saveUserProfileToRemote<any, any>(profile);
      } catch (error) {
        console.warn("Couldn't save profile to remote");
      }
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
