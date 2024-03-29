export enum EQueryKey {
  LinkFieldData = 'LINK_FIELD_DATA',
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
  UpdateProjectDataView = 'UPDATE_PROJECT_DATA_VIEW',
  UpdateProjectDataField = 'UPDATE_PROJECT_DATA_FIELD',
  UpdateProjectDataRecord = 'UPDATE_PROJECT_DATA_RECORD',
  UpdateMyData = 'UPDATE_MY_DATA',
  SignIn = 'SIGN_IN',
  SignUp = 'SIGN_UP',
  SignOut = 'SIGN_OUT',
  GithubLogin = 'GITHUB_LOGIN',
  EMailPasscode = 'EMAIL_PASSCODE',
}
