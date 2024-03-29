import { baseRequest, mainServerApi } from './http';
import { IProject, IUser, IUserProfile, IWorkspace } from './types';

interface IUserUpdateInput {
  mainWorkspace: string;
}

export function updateMyData(input: IUserUpdateInput) {
  return baseRequest<Partial<IUser>>(mainServerApi, 'PUT', '/my', input);
}

export function fetchMyProfile() {
  return baseRequest<IUserProfile>(mainServerApi, 'GET', '/my/profile');
}

export function fetchMyWorkspaces() {
  return baseRequest<IWorkspace[]>(mainServerApi, 'GET', '/my/workspaces');
}

export function fetchMyProjects() {
  return baseRequest<IProject[]>(mainServerApi, 'GET', '/my/projects');
}
