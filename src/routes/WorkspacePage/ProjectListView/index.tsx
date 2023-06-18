import { FolderIcon } from 'lucide-react';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getProjectInstancePath } from '../../helpers';
import ProjectEmptyPrompt from './EmptyPrompt';
import LoadingView from './LoadingView';
import { useFormatMessage, useUserStore } from '@/components/hooks';
import ProjectItem from '@/components/ProjectItem';
import ProjectList from '@/components/ProjectList';
import { IProject } from '@/libs/client/types';
import {
  useWorkspaceProjectListQuery,
  useWorkspaceQuery,
} from '@/libs/react-query';

function ProjectListView() {
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

  const renderProject = useCallback(
    (project: IProject) => (
      <NavLink key={project._id} to={getProjectInstancePath(project._id)}>
        <ProjectItem project={project} />
      </NavLink>
    ),
    []
  );

  if (!projects && !isError) {
    return <LoadingView />;
  }
  if (projects?.length === 0) {
    return <ProjectEmptyPrompt creatable={isOwner} />;
  }
  return (
    <ProjectList
      title={f('workspace.allProject')}
      icon={<FolderIcon className="h-6 w-6 text-primary" />}
      projects={projects}
      renderProject={renderProject}
    />
  );
}

export default observer(ProjectListView);
