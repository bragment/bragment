import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createProject,
  createProjectDataField,
  createProjectDataForm,
  createProjectDataModel,
  createProjectDataRecord,
  createProjectDataView,
  deleteProjectDataForm,
  fetchProject,
  fetchProjectDataRecords,
  updateProjectDataField,
  updateProjectDataFrom,
  updateProjectDataModel,
  updateProjectDataRecord,
  updateProjectDataView,
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

export function useProjectQuery(
  id: string,
  enabled: boolean,
  suspense?: boolean
) {
  return useQuery<IProject, IApiError>(
    [EQueryKey.Project, id],
    fetchProjectFn,
    {
      enabled,
      suspense,
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

export function useCreateProjectDataFormMutation() {
  const queryClient = useQueryClient();
  return useMutation(createProjectDataForm, {
    onSuccess: (project) => {
      queryClient.setQueryData<IProject | undefined>(
        [EQueryKey.Project, project._id],
        (cached) =>
          cached
            ? { ...cached, forms: [...cached.forms, ...project.forms] }
            : undefined
      );
    },
  });
}

export function useDeleteProjectDataFormMutation() {
  const queryClient = useQueryClient();
  return useMutation(deleteProjectDataForm, {
    onMutate: (input) => {
      const context = { deletedIndex: -1 };
      queryClient.setQueryData<IProject | undefined>(
        [EQueryKey.Project, input.projectId],
        (cached) =>
          cached
            ? {
                ...cached,
                forms: cached.forms.filter((el, index) => {
                  if (el._id === input.form._id) {
                    context.deletedIndex = index;
                    return false;
                  }
                  return true;
                }),
              }
            : undefined
      );
      return context;
    },
    onError: (_error, input, context) => {
      if (!context || context.deletedIndex < 0) {
        return;
      }
      const { deletedIndex } = context;
      queryClient.setQueryData<IProject | undefined>(
        [EQueryKey.Project, input.projectId],
        (cached) => {
          const forms = (cached?.forms || []).slice(0);
          forms.splice(deletedIndex, 0, input.form);
          return cached
            ? {
                ...cached,
                forms: cached.forms.filter((el, index) => {
                  if (el._id === input.form._id) {
                    context.deletedIndex = index;
                    return false;
                  }
                  return true;
                }),
              }
            : undefined;
        }
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

export function useProjectDataRecordListQuery(
  projectId: string,
  enabled: boolean,
  suspense: boolean
) {
  return useQuery<IProjectDataRecord[], IApiError>(
    [EQueryKey.ProjectDataRecords, projectId],
    fetchProjectDataRecordsFn,
    {
      enabled,
      suspense,
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

export function useUpdateProjectDataViewMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    [EMutationKey.UpdateProjectDataView],
    updateProjectDataView,
    {
      onSuccess: (project) => {
        const view = project?.views[0];
        if (view) {
          queryClient.setQueryData<IProject | undefined>(
            [EQueryKey.Project, project._id],
            (cached) =>
              cached
                ? {
                    ...cached,
                    views: cached.views.map((el) =>
                      el._id === view._id ? view : el
                    ),
                  }
                : undefined
          );
        }
      },
    }
  );
}

export function useUpdateProjectDataFieldMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    [EMutationKey.UpdateProjectDataField],
    updateProjectDataField,
    {
      onSuccess: (project) => {
        const field = project?.fields[0];
        if (field) {
          queryClient.setQueryData<IProject | undefined>(
            [EQueryKey.Project, project._id],
            (cached) =>
              cached
                ? {
                    ...cached,
                    fields: cached.fields.map((el) =>
                      el._id === field._id ? field : el
                    ),
                  }
                : undefined
          );
        }
      },
    }
  );
}

export function useUpdateProjectDataFormMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    [EMutationKey.UpdateProjectDataField],
    updateProjectDataFrom,
    {
      onSuccess: (project) => {
        const form = project?.forms[0];
        if (form) {
          queryClient.setQueryData<IProject | undefined>(
            [EQueryKey.Project, project._id],
            (cached) =>
              cached
                ? {
                    ...cached,
                    forms: cached.forms.map((el) =>
                      el._id === form._id ? form : el
                    ),
                  }
                : undefined
          );
        }
      },
    }
  );
}

export function useUpdateProjectDataRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    [EMutationKey.UpdateProjectDataModel],
    updateProjectDataRecord,
    {
      onSuccess: (record) => {
        if (record) {
          queryClient.setQueryData<IProjectDataRecord[] | undefined>(
            [EQueryKey.ProjectDataRecords, record.project],
            (cached) =>
              cached
                ? cached.map((el) => (el._id === record._id ? record : el))
                : undefined
          );
        }
      },
    }
  );
}
