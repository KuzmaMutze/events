import { AxiosRequestConfig } from 'axios';
import { errorFormatter, BaseFetcher, LogsConfig } from './common';
import { CreateProfileDto } from './contracts/profile/createProfile';

export class AppProfileClient extends BaseFetcher {
  constructor(config: AxiosRequestConfig, enableLogs?: LogsConfig | boolean) {
    super(config, { enableLogs, errorFormatter });
  }

  getProfileForUser<T = any>(
    username: string,
    applicationName: string
  ): Promise<T> {
    return this.get('/profile', {
      params: {
        username,
        applicationName,
      },
    });
  }

  saveProfileForUser<T = any>(user: CreateProfileDto): Promise<T> {
    return this.post('/profile', user, {
      params: {
        username: user.username,
        applicationName: user.username,
      },
    });
  }
}
