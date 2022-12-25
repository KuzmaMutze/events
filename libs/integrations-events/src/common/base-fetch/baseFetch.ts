import { defaultErrorFormatter, ErrorFormatter } from '../errors';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getRequestLog, getResponseLog, getResponseErrorLog } from './logs';

export interface LogsConfig {
  error: boolean;
  request: boolean;
  response: boolean;
}

export interface FetcherConfig {
  enableLogs?: boolean | LogsConfig;
  errorFormatter?: ErrorFormatter;
}

export abstract class BaseFetcher {
  readonly axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig, fetcherConfig?: FetcherConfig) {
    this.axiosInstance = axios.create(axiosConfig);

    const logsConfig: LogsConfig = fetcherConfig?.enableLogs
      ? typeof fetcherConfig.enableLogs === 'boolean'
        ? { error: true, request: true, response: true }
        : fetcherConfig.enableLogs
      : { error: false, request: false, response: false };
    const errorFormatter =
      fetcherConfig?.errorFormatter ?? defaultErrorFormatter;

    if (logsConfig.request) {
      this.axiosInstance.interceptors.request.use((config) => {
        const message = getRequestLog(config);
        console.log(message);
        return config;
      });
    }

    if (logsConfig.response) {
      this.axiosInstance.interceptors.response.use((response) => {
        const message = getResponseLog(response);
        console.log(message);
        return response;
      });
    }
    this.axiosInstance.interceptors.response.use(
      (config) => config,
      (error) => {
        if (error.isAxiosError) {
          const axiosError = error as AxiosError;
          if (logsConfig.error) {
            const message = getResponseErrorLog(axiosError);
            console.error(message);
          }
          throw errorFormatter(axiosError);
        }
        throw error;
      }
    );
  }

  request<T, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.request<T>(config).then((res) => res.data);
  }

  get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then((res) => res.data);
  }

  post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then((res) => res.data);
  }

  put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.axiosInstance.put<T>(url, data, config).then((res) => res.data);
  }

  patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.axiosInstance
      .patch<T>(url, data, config)
      .then((res) => res.data);
  }

  delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.axiosInstance.delete<T>(url, config).then((res) => res.data);
  }
}
