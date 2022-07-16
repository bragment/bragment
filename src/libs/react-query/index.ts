import { QueryClient } from 'react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
    },
  });
}

export * from './auth';
export * from './user';
export * from './workspace';
export * from './project';
