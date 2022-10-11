import { atomWithLastUpdate } from '@ngi/react';
import { UserProfile } from '@events/user-profile';
import { Profile } from '@ngi/common';
import { atom, PrimitiveAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

export type FullProfile = Profile<'events', UserProfile>;

export const fullProfileAtom = atom({} as FullProfile);

export const commonProfileAtom: PrimitiveAtom<FullProfile['common']> =
  atomWithLastUpdate(focusAtom(fullProfileAtom, (o) => o.prop('common')));

export const userProfileAtom: PrimitiveAtom<FullProfile['events']> =
  atomWithLastUpdate(focusAtom(fullProfileAtom, (o) => o.prop('events')));

// Settings
export const themeAtom = focusAtom(commonProfileAtom, (o) => o.prop('theme'));
export const toggleThemeAtom = atom(null, (get, set) => {
  const theme = get(themeAtom);
  set(themeAtom, theme === 'light' ? 'dark' : 'light');
});
