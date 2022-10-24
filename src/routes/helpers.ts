import { ERoutePath, ERoutePathName } from './types';

export function getWorkspaceInstancePath(id: string) {
  return ERoutePath.WorkspaceInstance.replace(ERoutePathName.WorkspaceId, id);
}

export function getWorkspaceProjectListPath(id: string) {
  return ERoutePath.WorkspaceProjectList.replace(
    ERoutePathName.WorkspaceId,
    id
  );
}

export function getWorkspaceMemberListPath(id: string) {
  return ERoutePath.WorkspaceMemberList.replace(ERoutePathName.WorkspaceId, id);
}

export function getProjectInstancePath(id: string) {
  return ERoutePath.ProjectInstance.replace(ERoutePathName.ProjectId, id);
}

export function getProjectDataModelPath(projectId: string, modelId: string) {
  return ERoutePath.ProjectDataModel.replace(
    ERoutePathName.ProjectId,
    projectId
  ).replace(ERoutePathName.ModelId, modelId);
}

export function getProjectDataViewPath(
  projectId: string,
  modelId: string,
  viewId: string
) {
  return ERoutePath.ProjectDataView.replace(ERoutePathName.ProjectId, projectId)
    .replace(ERoutePathName.ModelId, modelId)
    .replace(ERoutePathName.ViewId, viewId);
}
