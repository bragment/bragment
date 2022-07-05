import { useMutation, useQueryClient } from 'react-query';
import { createProject } from '../client';
import { IProject } from '../client/types';

import { EQueryKey } from './types';

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
