import { baseRequest, mainServerApi } from './http';
import { IRecordFieldData } from './types';

export function fetchLinkFieldData(
  projectId: string,
  recordId: string,
  fieldId: string,
  value: string
) {
  return baseRequest<IRecordFieldData>(
    mainServerApi,
    'GET',
    `/link/project/${projectId}/record/${recordId}/field/${fieldId}`,
    { value }
  );
}
