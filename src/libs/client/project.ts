import { baseRequest, mainServerApi } from './http';
import { IProject, IProjectDataModel } from './types';

export async function createProject(project: Partial<IProject>) {
  return baseRequest<IProject>(mainServerApi, 'POST', '/project', project);
}

export async function fetchProject(id: string) {
  return baseRequest<IProject>(mainServerApi, 'GET', `/project/${id}`);
}

export async function createProjectDataModel(
  model: Partial<IProjectDataModel> & { projectId: string }
) {
  return baseRequest<IProject>(
    mainServerApi,
    'POST',
    `/project/${model.projectId}/model`,
    model
  );
}
