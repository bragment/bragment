import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { requestEmailPasscode, signIn, signOut, signUp } from '../client';
import { IUserProfile } from '../client/types';
import { EMutationKey, EQueryKey } from './types';

export function setMyProfileQueryData(
  queryClient: QueryClient,
  profile: IUserProfile | undefined
) {
  queryClient.setQueryData([EQueryKey.MyProfile], profile);
  queryClient.setQueryData([EQueryKey.MyData], profile?.user);
  queryClient.setQueryData([EQueryKey.MyWorkspaces], profile?.workspaces);
  queryClient.setQueryData([EQueryKey.MyProjects], profile?.projects);
}

function unsetMyProfileQueryData(queryClient: QueryClient) {
  setMyProfileQueryData(queryClient, undefined);
}

export function useAuthSignInMutation() {
  const queryClient = useQueryClient();
  return useMutation([EMutationKey.SignIn], signIn, {
    onSuccess: (profile) => {
      setMyProfileQueryData(queryClient, profile);
    },
  });
}

export function useAuthSignUpMutation() {
  const queryClient = useQueryClient();
  return useMutation([EMutationKey.SignUp], signUp, {
    onSuccess: (profile) => {
      setMyProfileQueryData(queryClient, profile);
    },
  });
}

export function useAuthSignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation([EMutationKey.SignOut], signOut, {
    onMutate: () => {
      unsetMyProfileQueryData(queryClient);
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useAuthEmailPasscodeMutation() {
  return useMutation([EMutationKey.EMailPasscode], requestEmailPasscode);
}
