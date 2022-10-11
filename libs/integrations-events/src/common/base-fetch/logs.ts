import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const getFullUrl = (config: AxiosRequestConfig) => {
  const url = new URL((config.baseURL ?? '') + (config.url ?? '')).toString();
  if (!config.params) {
    return url;
  }
  return url + '?' + new URLSearchParams(config.params).toString();
};

export const getRequestLog = (config: AxiosRequestConfig) => {
  const fullUrl = getFullUrl(config);
  return `[Request][${config.method?.toUpperCase()}] ${fullUrl}`;
};

export const getResponseLog = (response: AxiosResponse) => {
  const fullUrl = getFullUrl(response.config);
  return `[Response][${response.config.method?.toUpperCase()}] ${fullUrl} - ${
    response.status
  }`;
};

export const getResponseErrorLog = (error: AxiosError) => {
  const fullUrl = getFullUrl(error.config);
  return `[Error][${error.config.method?.toUpperCase()}] ${fullUrl} - ${
    error.response?.status
  }: ${
    error.response?.data
      ? JSON.stringify(error.response.data)
      : error.response?.statusText
  }`;
};
