import { AppProfileClient } from '@integrations/events';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CommonProfile,
  commonProfileSchemaVersions,
  COMMON_PROFILE_KEY,
  defaultCommonProfile,
  Profile,
  UserData,
  SchemaVersions,
  commonMigration,
  UserProfileValidationResult,
  SchemaVersion,
  Migrations,
} from '@ngi/common';
import dayjs from 'dayjs';
import deepEqual from 'fast-deep-equal';
import {
  PROFILE_CLIENT,
  PROFILE_DEFAULT_PROVIDER,
  PROFILE_OPTIONS,
} from './constants';
import { ProfileDefaultProvider } from './profile-default-provider';
import { ProfileModuleOptions } from './profile.module';

@Injectable()
export class ProfileService {
  latestVersion: {
    common: number;
    app: number;
  };
  appName: string;

  constructor(
    @Inject(PROFILE_OPTIONS)
    private options: ProfileModuleOptions,
    @Inject(PROFILE_CLIENT)
    private profileClient: AppProfileClient,
    @Inject(PROFILE_DEFAULT_PROVIDER)
    private defaultProvider: ProfileDefaultProvider
  ) {
    this.latestVersion = {
      common: Math.max(
        ...Object.keys(commonProfileSchemaVersions).map((item) =>
          parseInt(item)
        )
      ),
      app: Math.max(
        ...Object.keys(this.options.schemaVersions).map((item) =>
          parseInt(item)
        )
      ),
    };
    this.appName = this.options.applicationName;
  }

  async validate(
    user: UserData,
    userProfile: unknown
  ): Promise<UserProfileValidationResult> {
    const castedProfile = userProfile as Profile<typeof this.appName, {}>;

    // Check if we got old-style profile
    // const oldStyleResult = this._validate(
    //   userProfile,
    //   this.options.schemaVersions,
    //   this.latestVersion.app
    // );

    // if (oldStyleResult.isValid) {
    //   return {
    //     isValid: true,
    //     isLatest: false,
    //   };
    // }

    if (
      !castedProfile?.[COMMON_PROFILE_KEY] ||
      !castedProfile?.[this.appName]
    ) {
      return {
        isValid: false,
        isLatest: false,
      };
    }

    const commonResult = this._validate(
      castedProfile[COMMON_PROFILE_KEY],
      commonProfileSchemaVersions,
      this.latestVersion.common
    );

    const applicationResult = this._validate(
      castedProfile[this.appName],
      this.options.schemaVersions,
      this.latestVersion.app
    );

    const commonRemote = await this.getCommonOrDefault(user);
    const appRemote = await this.getApplicationSpecificProfileOrDefault(user);

    return {
      isValid: commonResult.isValid && applicationResult.isValid,
      isLatest:
        commonResult.isLatest &&
        applicationResult.isLatest &&
        ts(castedProfile[COMMON_PROFILE_KEY].lastUpdated) >=
          ts(commonRemote.lastUpdated) &&
        ts(castedProfile[this.appName].lastUpdated) >=
          ts(appRemote.lastUpdated),
    };
  }

  _validate(
    profileChunk: unknown,
    schemaVersions: SchemaVersions,
    latestVersion: number
  ): UserProfileValidationResult {
    for (const version in schemaVersions) {
      const schema: SchemaVersion = schemaVersions[version];
      const isValid = schema.safeParse(profileChunk).success;

      if (isValid) {
        const { lastUpdated, ...parsed } = schema.parse(profileChunk);
        const { lastUpdated: unused1, ...chunk } =
          profileChunk as typeof parsed;

        return {
          isValid: true,
          isLatest:
            deepEqual(chunk, parsed) && latestVersion === parseInt(version),
        };
      }
    }

    return {
      isLatest: false,
      isValid: false,
    };
  }

  async save(user: UserData, profile: Profile<any, any>) {
    return await Promise.all([
      this.profileClient.saveProfileForUser(COMMON_PROFILE_KEY, user.email, {
        ...profile[COMMON_PROFILE_KEY],
      }),
      this.profileClient.saveProfileForUser(this.appName, user.email, {
        ...profile[this.appName],
      }),
    ]);
  }

  async getDefault(user: UserData): Promise<Profile<any, any>> {
    return {
      [COMMON_PROFILE_KEY]: defaultCommonProfile,
      [this.options.applicationName]: await this.getDefaultApplicationProfile(
        user
      ),
    };
  }

  async getAndUpgrade(user: UserData): Promise<Profile<any, any>> {
    return {
      [COMMON_PROFILE_KEY]: defaultCommonProfile,
      [this.options.applicationName]:
        await this.getApplicationSpecificProfileOrDefault(user),
    };
  }

  async getApplicationSpecificProfileOrDefault(user: UserData) {
    const _ = async () => {
      const remoteProfile = await this.profileClient.getProfileForUser(
        user.email,
        this.appName
      );

      return !!remoteProfile
        ? remoteProfile
        : await this.getDefaultApplicationProfile(user);
    };

    const res = await _();
    return {
      lastUpdated: nullTimestamp,
      ...res,
    };
  }

  async getDefaultApplicationProfile(user: UserData) {
    if (typeof this.defaultProvider === 'function') {
      return {
        lastUpdated: nullTimestamp.toISOString(),
        ...(await this.defaultProvider(user)),
      };
    } else {
      return {
        lastUpdated: nullTimestamp.toISOString(),
        ...(await this.defaultProvider.getProfile(user)),
      };
    }
  }

  async upgrade(user: UserData, userProfile: unknown) {
    let castedProfile = (userProfile ?? {}) as Profile<typeof this.appName, {}>;

    const localFetchedOrDefault =
      await this.getApplicationSpecificProfileOrDefault(user);
    const commonFetchedOrDefault = await this.getCommonOrDefault(user);

    // Convert from legacy
    if (!castedProfile[COMMON_PROFILE_KEY]) {
      if (castedProfile.version !== undefined) {
        castedProfile = {
          [COMMON_PROFILE_KEY]: commonFetchedOrDefault,
          [this.appName]: castedProfile as any,
        };
      } else if (
        // @ts-ignore
        (castedProfile as unknown) === {} ||
        castedProfile === null ||
        castedProfile === undefined
      ) {
        castedProfile = {
          [COMMON_PROFILE_KEY]: commonFetchedOrDefault,
        };
      } else {
        throw new BadRequestException(
          'Cannot upgrade profile. Is it corrupted?'
        );
      }
    }

    // At this point, the profile is guaranteed to not be legacy-style

    // If the app-specific profile isn't present, use the default
    if (!castedProfile[this.appName]) {
      castedProfile[this.appName] = localFetchedOrDefault;
    }
    if (
      ts(castedProfile[COMMON_PROFILE_KEY].lastUpdated) <
      ts(commonFetchedOrDefault.lastUpdated)
    ) {
      castedProfile[COMMON_PROFILE_KEY] = commonFetchedOrDefault;
    }

    if (
      ts(castedProfile[this.appName].lastUpdated) <
      ts(localFetchedOrDefault.lastUpdated)
    ) {
      castedProfile[this.appName] = localFetchedOrDefault;
    }

    const common = _upgrade(
      castedProfile[COMMON_PROFILE_KEY],
      commonProfileSchemaVersions,
      commonMigration,
      this.latestVersion.common
    );

    const local = _upgrade(
      castedProfile[this.appName],
      this.options.schemaVersions,
      this.options.migration,
      this.latestVersion.app
    );

    return {
      ...castedProfile, // To work well with localhost, we want to preserve other fields
      [COMMON_PROFILE_KEY]: common,
      [this.appName]: local,
    };
  }

  async getCommonOrDefault(user: UserData): Promise<CommonProfile> {
    try {
      return (
        (await this.profileClient.getProfileForUser(
          user.email,
          COMMON_PROFILE_KEY
        )) ?? { ...defaultCommonProfile }
      );
    } catch (error) {
      if (error) throw `${error} getCommonOrDefault`;
      return {
        ...defaultCommonProfile,
      };
    }
  }
}

const nullTimestamp = dayjs(0);
function ts(date?: string | Date) {
  return dayjs(date ?? 0);
}
function _upgrade<T = any, U = any>(
  value: T,
  schemas: SchemaVersions,
  migrations: Migrations,
  to: number
) {
  const from = (value as { version?: number }).version;
  if (typeof from !== 'number') {
    throw new Error('Cannot get version');
  }
  const schema = schemas[from];
  if (!schema) {
    throw new Error(`Cannot get schema for ${from} version`);
  }
  if (!schema.safeParse(value).success) {
    throw new Error('User profile is not valid');
  }
  if (from > to) {
    throw new Error('From is greater than to');
  }
  if (from === to) {
    return schema.parse(value) as unknown as U;
  }
  const versions = Array.from(Array(to - from), (_, i) => i + from + 1);
  let result = value;

  for (const version of versions) {
    const migration = migrations[version];
    if (!migration) {
      throw new Error(`Cannot get migration to ${version}`);
    }
    result = migration(result ?? {});
  }
  return result as unknown as U;
}
