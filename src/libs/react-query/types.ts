export enum EQueryKey {
  MyData = 'MY_DATA',
  MyProfile = 'MY_PROFILE',
  MyProjects = 'MY_PROJECTS',
  MyWorkspaces = 'MY_WORKSPACES',
  Project = 'PROJECT',
  ProjectDataRecords = 'PROJECT_DATA_RECORDS',
  WorkspaceProjects = 'WORKSPACE_PROJECTS',
  Workspace = 'WORKSPACE',
}

export enum EMutationKey {
  UpdateProjectDataModel = 'UPDATE_PROJECT_DATA_MODEL',
  UpdateProjectDataField = 'UPDATE_PROJECT_DATA_FIELD',
  UpdateProjectDataRecord = 'UPDATE_PROJECT_DATA_RECORD',
  UpdateMyData = 'UPDATE_MY_DATA',
  SignIn = 'SIGN_IN',
  SignUp = 'SIGN_UP',
  SignOut = 'SIGN_OUT',
  EMailPasscode = 'EMAIL_PASSCODE',
}
