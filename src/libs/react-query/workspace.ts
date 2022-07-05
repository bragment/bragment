import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { fetchMyWorkspaces } from '../client';
import { IApiError, IProject, IWorkspace } from '../client/types';
import { createWorkspace, fetchWorkspaceProjects } from '../client/workspace';
import { EQueryKey } from './types';

function fetchProjectListFn(context: QueryFunctionContext) {
  const [_key, id] = context.queryKey as [string, string];
  return fetchWorkspaceProjects(id);
}

export function useWorkspaceProjectListQuery(id: string, enabled: boolean) {
  return useQuery<IProject[], IApiError>(
    [EQueryKey.WorkspaceProjects, id],
    fetchProjectListFn,
    {
      enabled,
    }
  );
}

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
