import { baseRequest, mainServerApi } from './http';
import { IProject } from './types';

export async function createProject(project: Partial<IProject>) {
  return baseRequest<IProject>(mainServerApi, 'POST', '/project', project);
}
