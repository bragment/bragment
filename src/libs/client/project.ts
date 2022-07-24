import { baseRequest, mainServerApi } from './http';
import { IProject, IProjectDataModel, IProjectDataView } from './types';

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

export async function createProjectDataView(
  view: Partial<IProjectDataView> & { projectId: string }
) {
  return baseRequest<IProject>(
    mainServerApi,
    'POST',
    `/project/${view.projectId}/view`,
    view
  );
}
