import { AppProfileClient } from '@integrations/events';
import { Inject, Injectable } from '@nestjs/common';
import {
  COMMON_PROFILE_KEY,
  defaultCommonProfile,
  Profile,
  UserData,
} from '@ngi/common';
import dayjs from 'dayjs';
import {
  PROFILE_CLIENT,
  PROFILE_DEFAULT_PROVIDER,
  PROFILE_OPTIONS,
} from './constants';
import { ProfileDefaultProvider } from './profile-default-provider';
import { ProfileModuleOptions } from './profile.module';

@Injectable()
export class ProfileService {
  appName: string;

  constructor(
    @Inject(PROFILE_OPTIONS)
    private options: ProfileModuleOptions,
    @Inject(PROFILE_CLIENT)
    private profileClient: AppProfileClient,
    @Inject(PROFILE_DEFAULT_PROVIDER)
    private defaultProvider: ProfileDefaultProvider
  ) {
    this.appName = this.options.applicationName;
  }

  async getDefault(user: UserData): Promise<Profile<any, any>> {
    return {
      [COMMON_PROFILE_KEY]: defaultCommonProfile,
      [this.options.applicationName]: await this.getDefaultApplicationProfile(
        user
      ),
    };
  }

  // async getAndUpgrade(user: UserData): Promise<Profile<any, any>> {
  //   return {
  //     [COMMON_PROFILE_KEY]: defaultCommonProfile,
  //     [this.options.applicationName]: await this.getApplicationSpecificProfileOrDefault(
  //       user
  //     ),
  //   };
  // }

  async getApplicationSpecificProfileOrDefault(user: UserData) {
    const _ = async () => {
      try {
        return await this.profileClient.getProfileForUser(
          this.appName,
          user.unifiedName
        );
      } catch (error) {
        return await this.getDefaultApplicationProfile(user);
      }
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
}

const nullTimestamp = dayjs(0);
