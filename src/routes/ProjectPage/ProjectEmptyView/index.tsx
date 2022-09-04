import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import { useProjectQuery } from '../../../libs/react-query';
import DataModelEmptyPrompt from './DataModelEmptyPrompt';

function ProjectEmptyView() {
  const { me } = useUserStore();
  const { projectId = '' } = useParams();

  const { data: project } = useProjectQuery(projectId, !!(me && projectId));
  // TODO: or be workspace owner
  const isOwner = !!project?.owner.users.includes(me?._id || '');

  if (project?.models.length === 0) {
    return <DataModelEmptyPrompt creatable={isOwner} />;
  }

  return null;
}

export default observer(ProjectEmptyView);
