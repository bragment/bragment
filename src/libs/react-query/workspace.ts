import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchMyWorkspaces } from '../client';
import { IApiError, IWorkspace } from '../client/types';
import { createWorkspace } from '../client/workspace';
import { EQueryKey } from './types';

export function useCurrentWorkspaceListQuery(enabled: boolean) {
  return useQuery<IWorkspace[], IApiError>(
    EQueryKey.MyWorkspaces,
    fetchMyWorkspaces,
    {
      enabled,
    }
  );
}

export function useCreateWorkspaceMutation() {
  const queryClient = useQueryClient();
  return useMutation(createWorkspace, {
    onSuccess: (workspace) => {
      queryClient.setQueryData<IWorkspace[]>(
        EQueryKey.MyWorkspaces,
        (workspaces) => [...(workspaces || []), workspace]
      );
    },
  });
}
