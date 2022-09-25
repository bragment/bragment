import { baseRequest, mainServerApi } from './http';
import {
  IProject,
  IProjectDataField,
  IProjectDataForm,
  IProjectDataModel,
  IProjectDataRecord,
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

export async function createProjectDataForm(
  form: Partial<IProjectDataForm> & { projectId: string }
) {
  return baseRequest<IProject>(
    mainServerApi,
    'POST',
    `/project/${form.projectId}/form`,
    form
  );
}

export async function createProjectDataRecord(
  record: Partial<IProjectDataRecord> & { projectId: string }
) {
  return baseRequest<IProjectDataRecord>(
    mainServerApi,
    'POST',
    `/project/${record.projectId}/record`,
    record
  );
}

export async function deleteProjectDataForm(input: {
  projectId: string;
  form: IProjectDataForm;
}) {
  return baseRequest<IProject>(
    mainServerApi,
    'DELETE',
    `/project/${input.projectId}/form/${input.form._id}`
  );
}

export function fetchProjectDataRecords(projectId: string) {
  return baseRequest<IProjectDataRecord[]>(
    mainServerApi,
    'GET',
    `/project/${projectId}/records`
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

export function updateProjectDataView(
  input: Partial<IProjectDataView> & { projectId: string; viewId: string }
) {
  const { viewId, projectId } = input;
  return baseRequest<IProject>(
    mainServerApi,
    'PUT',
    `/project/${projectId}/view/${viewId}`,
    input
  );
}

export function updateProjectDataField(
  input: Partial<IProjectDataField> & { projectId: string; fieldId: string }
) {
  const { fieldId, projectId } = input;
  return baseRequest<IProject>(
    mainServerApi,
    'PUT',
    `/project/${projectId}/field/${fieldId}`,
    input
  );
}

export function updateProjectDataFrom(
  input: Partial<IProjectDataForm> & { projectId: string; formId: string }
) {
  const { formId, projectId } = input;
  return baseRequest<IProject>(
    mainServerApi,
    'PUT',
    `/project/${projectId}/form/${formId}`,
    input
  );
}

export function updateProjectDataRecord(
  input: Partial<IProjectDataRecord> & { projectId: string; recordId: string }
) {
  const { recordId, projectId } = input;
  return baseRequest<IProjectDataRecord>(
    mainServerApi,
    'PUT',
    `/project/${projectId}/record/${recordId}`,
    input
  );
}
