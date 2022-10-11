import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { errorFormatter, BaseFetcher, LogsConfig } from './common';
import { Headers } from './headers';

export class EventsClient extends BaseFetcher {
  constructor(config: AxiosRequestConfig, enableLogs?: LogsConfig | boolean) {
    super(config, { enableLogs, errorFormatter });
  }

  //   get(indentity: string, query: any): Promise<any> {
  //   return this.get("", query, {
  //     headers: this.getHeaders({indentity})
  //   })
  //   }

  private getHeaders(fields: Headers): AxiosRequestHeaders {
    const headers: AxiosRequestHeaders = {};
    if (fields.indentity) {
      headers['userName'] = fields.indentity;
    }

    return headers;
  }
}
