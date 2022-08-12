import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          const status = (error as AxiosError)?.response?.status;
          if ((status && status >= 400) || failureCount >= 4) {
            return false;
          }
          return true;
        },
      },
      mutations: {
        retry: (failureCount, error) => {
          const status = (error as AxiosError)?.response?.status;
          if (status === 400 || status === 401 || failureCount >= 3) {
            return false;
          }
          return true;
        },
      },
    },
  });
}

export * from './auth';
export * from './my';
export * from './workspace';
export * from './project';
