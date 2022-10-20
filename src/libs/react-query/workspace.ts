import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { IApiError, IProject, IWorkspace } from '../client/types';
import {
  createWorkspace,
  fetchWorkspace,
  fetchWorkspaceProjects,
} from '../client/workspace';
import { EQueryKey } from './types';

function fetchProjectListFn(context: QueryFunctionContext) {
  const [_key, id] = context.queryKey as string[];
  return fetchWorkspaceProjects(id);
}

function fetchWorkspaceFn(context: QueryFunctionContext) {
  const [_key, id] = context.queryKey as string[];
  return fetchWorkspace(id);
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

export function useWorkspaceQuery(id: string, enabled: boolean) {
  const queryClient = useQueryClient();
  return useQuery<IWorkspace, IApiError>(
    [EQueryKey.Workspace, id],
    fetchWorkspaceFn,
    {
      enabled,
      initialData: () =>
        queryClient
          .getQueryData<IWorkspace[]>([EQueryKey.MyWorkspaces])
          ?.find((workspace) => workspace._id === id),
    }
  );
}

export function useCreateWorkspaceMutation() {
  const queryClient = useQueryClient();
  return useMutation(createWorkspace, {
    onSuccess: (workspace) => {
      queryClient.setQueryData<IWorkspace[]>(
        [EQueryKey.MyWorkspaces],
        (workspaces) => [...(workspaces || []), workspace]
      );
    },
  });
}
