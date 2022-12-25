import { Profile } from '@ngi/common';
import axios from 'axios';

const fetcher = axios.create({
  baseURL: '/api/profile',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const storage = getStorage();

export async function fetchUserProfile<
  T extends {} = any,
  AppName extends string = any
>() {
  return await fetcher.get<Profile<AppName, T>>('').then((x) => x.data);
}

export async function upgradeUserProfile<
  T extends {} = any,
  AppName extends string = any
>(userProfile: Profile<AppName, T>) {
  return await fetcher.post('/upgrade', userProfile).then((x) => x.data);
}

export async function fetchDefaultUserProfile() {
  return await fetcher.get('/default').then((x) => x.data);
}

export async function saveUserProfileToRemote<
  T extends {} = any,
  AppName extends string = any
>(userProfile: Profile<AppName, T>) {
  return fetcher.put('', userProfile).then((x) => x.data);
}

export const userProfileKey = 'user-profile';

export function getUserProfileFromLocalStorage<T>(): T | null {
  const userProfile = storage.getItem(userProfileKey);
  if (userProfile === null) {
    return null;
  }

  return JSON.parse(userProfile);
}

export function saveUserProfileToLocalStorage<T>(userProfile: T): void {
  storage.setItem(userProfileKey, JSON.stringify(userProfile));
}

function getStorage(): Storage {
  try {
    const test = 'test';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return window.localStorage;
  } catch (error) {
    return (function () {
      let store: Record<string, string> = {};
      return {
        length,

        key(): null {
          return null;
        },
        getItem(key: string): string | null {
          return store[key] ?? null;
        },

        setItem(key: string, value: string): void {
          store[key] = value;
          length += 1;
        },

        clear() {
          store = {};
          length = 0;
        },

        removeItem(key: string): void {
          delete store[key];
          length -= 1;
        },

        getAll() {
          return store;
        },
      };
    })();
  }
}
