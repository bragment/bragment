import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  fetchMyProfile,
  IUserProfile,
  signIn,
  signOut,
  signUp,
  updateMyData,
} from '../client';
import { IApiError, IUser } from '../client/types';
import { EQueryKey } from './types';

function updateUserCurrentQueryData(
  queryClient: QueryClient,
  user: Partial<IUser>
) {
  queryClient.setQueryData<IUser | undefined>(EQueryKey.MyData, (old) =>
    old ? { ...old, ...user } : undefined
  );
}

function setUserProfileQueryData(
  queryClient: QueryClient,
  profile: IUserProfile | undefined
) {
  queryClient.setQueryData(EQueryKey.MyProfile, profile);
  queryClient.setQueryData(EQueryKey.MyData, profile?.user);
  queryClient.setQueryData(EQueryKey.MyWorkspaces, profile?.workspaces);
  queryClient.setQueryData(EQueryKey.MyProjects, profile?.projects);
}

function unsetUserProfileQueryData(queryClient: QueryClient) {
  setUserProfileQueryData(queryClient, undefined);
}

export function useUserSignInMutation() {
  const queryClient = useQueryClient();
  return useMutation('signIn', signIn, {
    onSuccess: (profile) => {
      setUserProfileQueryData(queryClient, profile);
    },
  });
}

export function useUserSignUpMutation() {
  const queryClient = useQueryClient();
  return useMutation('signUp', signUp, {
    onSuccess: (profile) => {
      setUserProfileQueryData(queryClient, profile);
    },
  });
}

export function useUserSignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation('signOut', signOut, {
    onMutate: () => {
      unsetUserProfileQueryData(queryClient);
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useUserUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation('update', updateMyData, {
    onSuccess: (user) => {
      updateUserCurrentQueryData(queryClient, user);
    },
  });
}

export function useUserProfileQuery(enabled: boolean) {
  const queryClient = useQueryClient();
  return useQuery<IUserProfile, IApiError>(
    EQueryKey.MyProfile,
    fetchMyProfile,
    {
      enabled,
      onSuccess: (profile) => {
        setUserProfileQueryData(queryClient, profile);
      },
    }
  );
}
