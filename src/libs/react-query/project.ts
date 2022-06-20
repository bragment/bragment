import { useQuery } from 'react-query';
import { fetchCurrentProjectList } from '../client';
import { IApiError, IProject } from '../client/types';

export function useCurrentProjectListQuery(enabled: boolean) {
  return useQuery<IProject[], IApiError>('projects', fetchCurrentProjectList, {
    enabled,
  });
}
