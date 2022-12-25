import { AxiosRequestConfig } from 'axios';
import { errorFormatter, BaseFetcher, LogsConfig } from './common';
import { ProfileDto } from './contracts';

export class AppProfileClient extends BaseFetcher {
  constructor(config: AxiosRequestConfig, enableLogs?: LogsConfig | boolean) {
    super(config, { enableLogs, errorFormatter });
  }

  getProfileForUser<T = any>(
    email: string,
    applicationName: string
  ): Promise<ProfileDto<T>> {
    return this.get('/profile', {
      params: {
        email,
        applicationName,
      },
    });
  }

  saveProfileForUser<T = any>(
    applicationName: string,
    email: string,
    profile: T
  ): Promise<ProfileDto<T>> {
    return this.post('/profile', profile, {
      params: {
        email,
        applicationName,
      },
    });
  }
}
