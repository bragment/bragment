import { mainServerApi } from './http';
import { IProject } from './types';

export async function fetchCurrentProjectList() {
  const response = await mainServerApi.get<IProject[]>('/project/list');
  return response.data;
}
