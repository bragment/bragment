import type { AxiosError } from 'axios';
import { QueryClient } from 'react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          const status = (error as AxiosError)?.response?.status;
          if (status === 401 || failureCount >= 4) {
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
