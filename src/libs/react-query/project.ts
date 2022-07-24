import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  createProject,
  createProjectDataModel,
  createProjectDataView,
  fetchProject,
} from '../client';
import { IApiError, IProject } from '../client/types';

import { EQueryKey } from './types';

function fetchProjectFn(context: QueryFunctionContext) {
  const [_key, id] = context.queryKey as [string, string];
  return fetchProject(id);
}

export function useProjectQuery(
  id: string,
  enabled: boolean,
  workspaceId?: string
) {
  const queryClient = useQueryClient();
  return useQuery<IProject, IApiError>(
    [EQueryKey.Project, id],
    fetchProjectFn,
    {
      enabled,
      initialData: !workspaceId
        ? undefined
        : () =>
            queryClient
              .getQueryData<IProject[]>([
                EQueryKey.WorkspaceProjects,
                workspaceId,
              ])
              ?.find((project) => project._id === id),
    }
  );
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation(createProject, {
    onSuccess: (project) => {
      queryClient.setQueryData<IProject[] | undefined>(
        [EQueryKey.WorkspaceProjects, project.workspace],
        (projects) => (projects ? [...projects, project] : undefined)
      );
    },
  });
}

export function useCreateProjectDataModelMutation() {
  const queryClient = useQueryClient();
  return useMutation(createProjectDataModel, {
    onSuccess: (project) => {
      queryClient.setQueryData<IProject | undefined>(
        [EQueryKey.Project, project._id],
        (cached) =>
          cached
            ? {
                ...cached,
                models: [...cached.models, ...project.models],
                views: [...cached.views, ...project.views],
              }
            : undefined
      );
    },
  });
}

export function useCreateProjectDataViewMutation() {
  const queryClient = useQueryClient();
  return useMutation(createProjectDataView, {
    onSuccess: (project) => {
      queryClient.setQueryData<IProject | undefined>(
        [EQueryKey.Project, project._id],
        (cached) =>
          cached
            ? { ...cached, views: [...cached.views, ...project.views] }
            : undefined
      );
    },
  });
}
