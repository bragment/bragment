import { baseRequest, mainServerApi } from './http';
import { IProject, IWorkspace } from './types';

export async function createWorkspace(workspace: Partial<IWorkspace>) {
  return baseRequest<IWorkspace>(
    mainServerApi,
    'POST',
    '/workspace',
    workspace
  );
}
