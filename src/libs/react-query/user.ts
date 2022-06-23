import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { fetchProfile, IUserProfile, signIn, signOut, signUp } from '../client';
import { IApiError } from '../client/types';

function setUserProfileQueryData(
  queryClient: QueryClient,
  profile: IUserProfile
) {
  queryClient.setQueryData('profile', profile);
  queryClient.setQueryData('workspaces', profile.workspaces);
  queryClient.setQueryData('projects', profile.projects);
}

function unsetUserProfileQueryData(queryClient: QueryClient) {
  queryClient.setQueryData('profile', undefined);
  queryClient.setQueryData('workspaces', []);
  queryClient.setQueryData('projects', []);
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

export function useUserProfileQuery(enabled: boolean) {
  const queryClient = useQueryClient();
  return useQuery<IUserProfile, IApiError>('profile', fetchProfile, {
    enabled,
    onSuccess: (profile) => {
      setUserProfileQueryData(queryClient, profile);
    },
  });
}
