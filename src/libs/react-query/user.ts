import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { fetchMyProfile, updateMyData } from '../client';
import { IApiError, IUser, IUserProfile } from '../client/types';
import { setUserProfileQueryData } from './auth';
import { EQueryKey } from './types';

function updateUserCurrentQueryData(
  queryClient: QueryClient,
  user: Partial<IUser>
) {
  queryClient.setQueryData<IUser | undefined>(EQueryKey.MyData, (old) =>
    old ? { ...old, ...user } : undefined
  );
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
