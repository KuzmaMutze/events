import { Inject, Injectable } from '@nestjs/common';
import {
  COMMON_PROFILE_KEY,
  defaultCommonProfile,
  Profile,
  UserData,
} from '@ngi/common';
import dayjs from 'dayjs';
import { PROFILE_DEFAULT_PROVIDER, PROFILE_OPTIONS } from './constants';
import { ProfileDefaultProvider } from './profile-default-provider';
import { ProfileModuleOptions } from './profile.module';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_OPTIONS)
    private options: ProfileModuleOptions,
    @Inject(PROFILE_DEFAULT_PROVIDER)
    private defaultProvider: ProfileDefaultProvider
  ) {}

  async getDefault(user: UserData): Promise<Profile<any, any>> {
    return {
      [COMMON_PROFILE_KEY]: defaultCommonProfile,
      [this.options.applicationName]: await this.getDefaultApplicationProfile(
        user
      ),
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
