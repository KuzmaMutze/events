import { CommonProfile } from './common-profile';

// Represents the combined profile.
// To work well with localhost, avoid erasing fields not covered by this type.

export type Profile<
  ApplicationName extends string,
  ApplicationProfile extends {}
> = CommonProfileChunk &
  ApplicationProfileChunk<ApplicationName, ApplicationProfile>;

export interface CommonProfileChunk {
  common: CommonProfile;
}

export type ApplicationProfileChunk<Key extends string, Value extends {}> = {
  [K in Key]: Value & {
    lastUpdated: Date;
  };
};
