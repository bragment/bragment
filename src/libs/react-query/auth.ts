import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { signIn, signOut, signUp } from '../client';
import { IUserProfile } from '../client/types';
import { EQueryKey } from './types';

export function setUserProfileQueryData(
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

export function useAuthSignInMutation() {
  const queryClient = useQueryClient();
  return useMutation('signIn', signIn, {
    onSuccess: (profile) => {
      setUserProfileQueryData(queryClient, profile);
    },
  });
}

export function useAuthSignUpMutation() {
  const queryClient = useQueryClient();
  return useMutation('signUp', signUp, {
    onSuccess: (profile) => {
      setUserProfileQueryData(queryClient, profile);
    },
  });
}

export function useAuthSignOutMutation() {
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
