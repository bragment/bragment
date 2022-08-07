import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiOutlineFolder, HiOutlineUserGroup } from 'react-icons/hi';
import { Navigate, NavLink } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import ProjectItem from '../../components/ProjectItem';
import ProjectItemSkeleton from '../../components/ProjectItem/Skeleton';
import ProjectList from '../../components/ProjectList';
import WorkspaceItem from '../../components/WorkspaceItem';
import WorkspaceList from '../../components/WorkspaceList';
import { IProject, IWorkspace } from '../../libs/client/types';
import {
  useMyProjectListQuery,
  useMyWorkspaceListQuery,
} from '../../libs/react-query';
import { getProjectInstancePath, getWorkspaceInstancePath } from '../helpers';
import { ERoutePath } from '../types';

function Content() {
  const f = useFormatMessage();
  const { me } = useUserStore();
  const { data: workspaces } = useMyWorkspaceListQuery(!!me);
  const { data: projects, isError } = useMyProjectListQuery(!!me);

  const renderProjectSkeleton = useCallback(
    (_: IProject, i: number) => <ProjectItemSkeleton key={i} />,
    []
  );
  const renderProject = useCallback(
    (project: IProject) => (
      <NavLink key={project._id} to={getProjectInstancePath(project._id)}>
        <ProjectItem project={project} />
      </NavLink>
    ),
    []
  );
  const renderWorkspace = useCallback(
    (workspace: IWorkspace) => (
      <NavLink key={workspace._id} to={getWorkspaceInstancePath(workspace._id)}>
        <WorkspaceItem workspace={workspace} />
      </NavLink>
    ),
    []
  );

  if (!isError && !projects) {
    return (
      <ProjectList
        title={
          <div
            className={classNames(
              'bg-base-content',
              'w-48 h-7 rounded animate-pulse'
            )}
          />
        }
        projects={Array(4).fill({})}
        renderProject={renderProjectSkeleton}
      />
    );
  }
  if (workspaces?.length === 0 && projects?.length === 0) {
    return <Navigate to={ERoutePath.WorkspaceCreate} replace />;
  }

  return (
    <>
      {projects && projects.length > 0 && (
        <ProjectList
          title={f('project.myProjects')}
          icon={<HiOutlineFolder className="text-primary text-xl" />}
          projects={projects}
          renderProject={renderProject}
        />
      )}
      {workspaces && workspaces.length > 0 && (
        <WorkspaceList
          title={f('workspace.myWorkspaces')}
          icon={<HiOutlineUserGroup className="text-secondary text-xl" />}
          workspaces={workspaces}
          renderWorkspace={renderWorkspace}
        />
      )}
    </>
  );
}

export default observer(Content);
