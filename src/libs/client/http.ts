import axios, { AxiosInstance } from 'axios';
import { IApiError } from './types';

export const mainServerApi = axios.create({
  baseURL: process.env.MAIN_SERVER_URL,
  timeout: 30 * 1000,
  headers: {
    'content-type': 'application/json',
    'x-app-id': process.env.APP_ID || '',
    'x-app-version': process.env.APP_VERSION || '',
  },
  withCredentials: true,
});

export function parseApiErrorMessage(error: IApiError) {
  return error?.response?.data?.message || undefined;
}

export async function baseRequest<ReturnData = any, InputData = any>(
  api: AxiosInstance,
  method: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT',
  url: string,
  data?: InputData
) {
  const response = await api.request<ReturnData>({
    method,
    url,
    data,
  });
  return response.data;
}
