import { Profile } from '@ngi/common';
import axios from 'axios';

const fetcher = axios.create({
  baseURL: '/api/profile',
});

export async function upgradeUserProfile<
  T extends {} = any,
  AppName extends string = any
>(userProfile: Profile<AppName, T>) {
  return await fetcher.post('/upgrade', userProfile).then((x) => x.data);
}

export async function fetchDefaultUserProfile() {
  return await fetcher.get('/default').then((x) => x.data);
}

export const userProfileKey = 'user-profile';

export function getUserProfileFromLocalStorage<T>(): T | null {
  const userProfile = window.localStorage.getItem(userProfileKey);
  if (userProfile === null) {
    return null;
  }

  return JSON.parse(userProfile);
}

export function saveUserProfileToLocalStorage<T>(userProfile: T): void {
  window.localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
}
