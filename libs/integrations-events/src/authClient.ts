import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { errorFormatter, BaseFetcher, LogsConfig } from './common';
import { GetRoleByUserRequest } from './contracts/auth/getRoleByUserRequest';
import { Headers } from './headers';

export class AuthClient extends BaseFetcher {
  constructor(config: AxiosRequestConfig, enableLogs?: LogsConfig | boolean) {
    super(config, { enableLogs, errorFormatter });
  }

  getRoleByUser(query: GetRoleByUserRequest) {
    return this.get('/user/getByUser', {
      params: query,
    });
  }
}
// в раздумие что не обязательно делать мидл веер а просто у чуваков с видоса копирнуть
// а post upgrade делать прокидывая боди
