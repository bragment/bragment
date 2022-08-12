import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createProject,
  createProjectDataField,
  createProjectDataModel,
  createProjectDataRecord,
  createProjectDataView,
  fetchProject,
  fetchProjectDataRecords,
  updateProjectDataModel,
} from '../client';
import { IApiError, IProject, IProjectDataRecord } from '../client/types';
import { EMutationKey, EQueryKey } from './types';

function fetchProjectFn(context: QueryFunctionContext) {
  const [_key, id] = context.queryKey as [string, string];
  return fetchProject(id);
}

function fetchProjectDataRecordsFn(context: QueryFunctionContext) {
  const [_key, projectId] = context.queryKey as [string, string];
  return fetchProjectDataRecords(projectId);
}

export function useProjectQuery(id: string, enabled: boolean) {
  return useQuery<IProject, IApiError>(
    [EQueryKey.Project, id],
    fetchProjectFn,
    {
      enabled,
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
                fields: [...cached.fields, ...project.fields],
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

export function useCreateProjectDataFieldMutation() {
  const queryClient = useQueryClient();
  return useMutation(createProjectDataField, {
    onSuccess: (project) => {
      queryClient.setQueryData<IProject | undefined>(
        [EQueryKey.Project, project._id],
        (cached) =>
          cached
            ? { ...cached, fields: [...cached.fields, ...project.fields] }
            : undefined
      );
    },
  });
}

export function useCreateProjectDataRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation(createProjectDataRecord, {
    onSuccess: (record) => {
      queryClient.setQueryData<IProjectDataRecord[] | undefined>(
        [EQueryKey.ProjectDataRecords, record.project],
        (cached) => (cached ? [...cached, record] : undefined)
      );
    },
  });
}

export function useProjectDataRecordQuery(projectId: string, enabled: boolean) {
  return useQuery<IProjectDataRecord[], IApiError>(
    [EQueryKey.ProjectDataRecords, projectId],
    fetchProjectDataRecordsFn,
    {
      enabled,
    }
  );
}

export function useUpdateProjectDataModelMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    [EMutationKey.UpdateProjectDataModel],
    updateProjectDataModel,
    {
      onSuccess: (project) => {
        const model = project?.models[0];
        if (model) {
          queryClient.setQueryData<IProject | undefined>(
            [EQueryKey.Project, project._id],
            (cached) =>
              cached
                ? {
                    ...cached,
                    models: cached.models.map((el) =>
                      el._id === model._id ? model : el
                    ),
                  }
                : undefined
          );
        }
      },
    }
  );
}
