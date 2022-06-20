import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { IApiError, IWorkspace } from '../client/types';
import {
  createWorkspace,
  fetchCurrentWorkspaceList,
  fetchWorkspace,
} from '../client/workspace';

function fetchWorkspaceFn(context: QueryFunctionContext) {
  const [_key, id] = context.queryKey as [string, string];
  return fetchWorkspace(id);
}

export function useWorkspaceQuery(workspaceId: string) {
  return useQuery<IWorkspace, IApiError>(
    ['workspace', workspaceId],
    fetchWorkspaceFn
  );
}

export function useCurrentWorkspaceListQuery(enabled: boolean) {
  return useQuery<IWorkspace[], IApiError>(
    'workspaces',
    fetchCurrentWorkspaceList,
    {
      enabled,
    }
  );
}

export function useCreateWorkspaceMutation() {
  const queryClient = useQueryClient();
  return useMutation(createWorkspace, {
    onSuccess: (workspace) => {
      queryClient.setQueryData<IWorkspace[]>('workspaces', (workspaces) => [
        ...(workspaces || []),
        workspace,
      ]);
    },
  });
}
