import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import { useProjectQuery } from '../../../libs/react-query';
import DataModelEmptyPrompt from './DataModelEmptyPrompt';

function DefaultView() {
  const { me } = useUserStore();
  const { projectId = '' } = useParams();

  const { data: project, isError } = useProjectQuery(
    projectId,
    !!(me && projectId)
  );
  // TODO: or be workspace owner
  const isOwner = !!project?.owner.users.includes(me?._id || '');

  if (!project && !isError) {
    // TODO: show loading view
    return <></>;
  }

  if (project?.models.length === 0) {
    return <DataModelEmptyPrompt creatable={isOwner} />;
  }

  return null;
}

export default observer(DefaultView);
