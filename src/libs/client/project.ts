import { baseRequest, mainServerApi } from './http';
import {
  IProject,
  IProjectDataField,
  IProjectDataModel,
  IProjectDataView,
} from './types';

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

export async function createProjectDataField(
  field: Partial<IProjectDataField> & { projectId: string }
) {
  return baseRequest<IProject>(
    mainServerApi,
    'POST',
    `/project/${field.projectId}/field`,
    field
  );
}

export function updateProjectDataModel(
  input: Partial<IProjectDataModel> & { projectId: string; modelId: string }
) {
  const { modelId, projectId } = input;
  return baseRequest<IProject>(
    mainServerApi,
    'PUT',
    `/project/${projectId}/model/${modelId}`,
    input
  );
}
