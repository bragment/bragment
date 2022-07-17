import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';
import { HiOutlinePlus, HiOutlineViewGrid } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import ProjectItem from '../../components/ProjectItem';
import ProjectItemSkeleton from '../../components/ProjectItem/Skeleton';
import ProjectList from '../../components/ProjectList';
import { IProject } from '../../libs/client/types';
import {
  useWorkspaceProjectListQuery,
  useWorkspaceQuery,
} from '../../libs/react-query';

function ProjectListView() {
  const { me } = useUserStore();
  const { workspaceId = '' } = useParams();
  const { data: workspace } = useWorkspaceQuery(
    workspaceId,
    !!(me && workspaceId)
  );
  const { data: projects, isLoading } = useWorkspaceProjectListQuery(
    workspaceId,
    !!(me && workspaceId)
  );
  const { setCreateProjectDialogVisible } = useDialogStore();
  const f = useFormatMessage();
  const isOwner = !!workspace?.owner.users.includes(me?._id || '');

  const handelCreateNewProject = useCallback(() => {
    setCreateProjectDialogVisible(true);
  }, [setCreateProjectDialogVisible]);
  const renderProject = useCallback(
    (project: IProject) => <ProjectItem key={project._id} project={project} />,
    []
  );
  const renderProjectSkeleton = useCallback(
    (_: IProject, i: number) => <ProjectItemSkeleton key={i} />,
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

  if (isLoading || !projects) {
    return (
      <ProjectList
        title={f('workspace.AllProject')}
        icon={<HiOutlineViewGrid className="text-primary text-xl" />}
        projects={Array(4).fill({})}
        renderProject={renderProjectSkeleton}
      />
    );
  }

  if (projects?.length) {
    return (
      <ProjectList
        title={f('workspace.AllProject')}
        icon={<HiOutlineViewGrid className="text-primary text-xl" />}
        actions={actions}
        projects={projects}
        renderProject={renderProject}
      />
    );
  } else {
    // TODO: empty state view
    return null;
  }
}

export default observer(ProjectListView);
