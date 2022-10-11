import { UserData } from '@ngi/common';

export type ProfileDefaultProvider<ProfileChunk = any> =
  | ProfileDefaultProviderClass<ProfileChunk>
  | ProfileDefaultProviderFn<ProfileChunk>;

// Usage example:
//  ts
//  {
//     provide: PROFILE_DEFAULT_PROVIDER,
//     useClass: <this class>
//  }

export interface ProfileDefaultProviderClass<ProfileChunk = any> {
  getProfile: ProfileDefaultProviderFn<ProfileChunk>;
}

//  Usage example:
//  ts
//  {
//     provide: PROFILE_DEFAULT_PROVIDER,
//     useValue: <this fn>
//  }

export type ProfileDefaultProviderFn<ProfileChunk = any> = (
  user: UserData
) => ProfileChunk | Promise<ProfileChunk>;
