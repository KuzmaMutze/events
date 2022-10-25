import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { errorFormatter, BaseFetcher, LogsConfig } from './common';
import { Headers } from './headers';

export class EventsClient extends BaseFetcher {
  constructor(config: AxiosRequestConfig, enableLogs?: LogsConfig | boolean) {
    super(config, { enableLogs, errorFormatter });
  }

  //   get(token: string, query: any): Promise<any> {
  //   return this.get("", query, {
  //     headers: this.getHeaders({indentity})
  //   })
  //   }

  getUsers(token: string) {
    return this.get('/users', {
      headers: this.getHeaders({ token }),
    });
  }

  private getHeaders(fields: Headers): AxiosRequestHeaders {
    const headers: AxiosRequestHeaders = {};
    if (fields.token) {
      headers['Authorization'] = fields.token;
    }

    return headers;
  }
}
