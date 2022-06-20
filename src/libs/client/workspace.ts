import { mainServerApi } from './http';
import { IWorkspace } from './types';

export async function fetchCurrentWorkspaceList() {
  const response = await mainServerApi.get<IWorkspace[]>('/workspace/list');
  return response.data;
}

export async function createWorkspace(workspace: Partial<IWorkspace>) {
  const response = await mainServerApi.post<IWorkspace>(
    '/workspace',
    workspace
  );
  return response.data;
}

export async function fetchWorkspace(id: string) {
  const response = await mainServerApi.post<IWorkspace>(`/workspace/${id}`);
  return response.data;
}
