import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchMyProfile,
  fetchMyProjects,
  fetchMyWorkspaces,
  updateMyData,
} from '../client';
import {
  IApiError,
  IProject,
  IUser,
  IUserProfile,
  IWorkspace,
} from '../client/types';
import { setMyProfileQueryData } from './auth';
import { EMutationKey, EQueryKey } from './types';

function updateMyDataQueryData(queryClient: QueryClient, user: Partial<IUser>) {
  queryClient.setQueryData<IUser | undefined>([EQueryKey.MyData], (old) =>
    old ? { ...old, ...user } : undefined
  );
}

export function useUpdateMyDataMutation() {
  const queryClient = useQueryClient();
  return useMutation([EMutationKey.UpdateMyData], updateMyData, {
    onSuccess: (user) => {
      updateMyDataQueryData(queryClient, user);
    },
  });
}

export function useMyProfileQuery(enabled: boolean) {
  const queryClient = useQueryClient();
  return useQuery<IUserProfile, IApiError>(
    [EQueryKey.MyProfile],
    fetchMyProfile,
    {
      enabled,
      onSuccess: (profile) => {
        setMyProfileQueryData(queryClient, profile);
      },
    }
  );
}

export function useMyWorkspaceListQuery(enabled: boolean) {
  return useQuery<IWorkspace[], IApiError>(
    [EQueryKey.MyWorkspaces],
    fetchMyWorkspaces,
    {
      enabled,
    }
  );
}

export function useMyProjectListQuery(enabled: boolean) {
  return useQuery<IProject[], IApiError>(
    [EQueryKey.MyProjects],
    fetchMyProjects,
    {
      enabled,
    }
  );
}
