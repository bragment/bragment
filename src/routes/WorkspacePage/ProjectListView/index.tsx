import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';
import { HiOutlineFolder, HiOutlinePlus } from 'react-icons/hi';
import { NavLink, useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../../components/hooks';
import ProjectItem from '../../../components/ProjectItem';
import ProjectList from '../../../components/ProjectList';
import { IProject } from '../../../libs/client/types';
import {
  useWorkspaceProjectListQuery,
  useWorkspaceQuery,
} from '../../../libs/react-query';
import { getProjectInstancePath } from '../../helpers';
import EmptyView from './EmptyView';
import LoadingView from './LoadingView';

function ProjectListView() {
  const { setCreateProjectDialogVisible } = useDialogStore();
  const f = useFormatMessage();
  const { me } = useUserStore();
  const { workspaceId = '' } = useParams();
  const { data: workspace } = useWorkspaceQuery(
    workspaceId,
    !!(me && workspaceId)
  );
  const { data: projects, isError } = useWorkspaceProjectListQuery(
    workspaceId,
    !!(me && workspaceId)
  );
  const isOwner = !!workspace?.owner.users.includes(me?._id || '');

  const handelCreateNewProject = useCallback(() => {
    setCreateProjectDialogVisible(true);
  }, [setCreateProjectDialogVisible]);
  const renderProject = useCallback(
    (project: IProject) => (
      <NavLink key={project._id} to={getProjectInstancePath(project._id)}>
        <ProjectItem project={project} />
      </NavLink>
    ),
    []
  );

  const actions = useMemo(
    () =>
      isOwner
        ? [
            <button
              key="createProject"
              className="btn btn-ghost"
              onClick={handelCreateNewProject}>
              <HiOutlinePlus className="text-xl" />
            </button>,
          ]
        : [],
    [isOwner, handelCreateNewProject]
  );

  if (!projects && !isError) {
    return <LoadingView />;
  }
  if (projects?.length === 0) {
    return <EmptyView creatable={isOwner} />;
  }
  return (
    <ProjectList
      title={f('workspace.allProject')}
      icon={<HiOutlineFolder className="text-primary text-xl" />}
      actions={actions}
      projects={projects}
      renderProject={renderProject}
    />
  );
}

export default observer(ProjectListView);
