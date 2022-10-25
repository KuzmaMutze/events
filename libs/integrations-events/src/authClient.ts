import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { errorFormatter, BaseFetcher, LogsConfig } from './common';
import { CreateUserData } from './contracts/auth/createUserData';
import { LoginUserData } from './contracts/auth/loginUserData';
import { Headers } from './headers';

export class AuthClient extends BaseFetcher {
  constructor(config: AxiosRequestConfig, enableLogs?: LogsConfig | boolean) {
    super(config, { enableLogs, errorFormatter });
  }

  login(userData: LoginUserData) {
    return this.post('/auth/login', userData);
  }

  registration(userData: CreateUserData) {
    return this.post('/auth/registration', userData);
  }
}
