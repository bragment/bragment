import {
  QueryFunctionContext,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchLinkFieldData } from '../client/link';
import {
  IApiError,
  IProjectDataRecord,
  IRecordFieldData,
} from '../client/types';
import { EQueryKey } from './types';

function fetchLinkFieldDataFn(context: QueryFunctionContext) {
  const [_key, projectId, recordId, fieldId, value] =
    context.queryKey as string[];
  return fetchLinkFieldData(projectId, recordId, fieldId, value);
}

export function useLinkFieldDataQuery(
  projectId: string,
  recordId: string,
  fieldId: string,
  value: string,
  enabled: boolean
) {
  const queryClient = useQueryClient();
  return useQuery<IRecordFieldData, IApiError>(
    [EQueryKey.LinkFieldData, projectId, recordId, fieldId, value],
    fetchLinkFieldDataFn,
    {
      enabled,
      onSuccess: (fieldData) => {
        if (fieldData) {
          queryClient.setQueryData<IProjectDataRecord[] | undefined>(
            [EQueryKey.ProjectDataRecords, projectId],
            (cached) =>
              cached
                ? cached.map((el) =>
                    el._id === recordId
                      ? { ...el, data: { ...el.data, [fieldId]: fieldData } }
                      : el
                  )
                : undefined
          );
        }
      },
    }
  );
}
