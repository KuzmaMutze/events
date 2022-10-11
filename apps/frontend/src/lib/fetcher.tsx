// import { NgiError } from '@ngi/common';
import axios, { AxiosError } from 'axios';

const fetcher = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

fetcher.interceptors.response.use(
  (value) => value,
  (error: AxiosError) => {
    throw error.response?.data;
  }
);

export { fetcher };
