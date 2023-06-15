import { FolderIcon } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useFormatMessage } from '../../../components/hooks';
import ProjectItemSkeleton from '../../../components/ProjectItem/Skeleton';
import ProjectList from '../../../components/ProjectList';
import { IProject } from '../../../libs/client/types';

function LoadingView() {
  const f = useFormatMessage();
  const renderProjectSkeleton = useCallback(
    (_: IProject, i: number) => <ProjectItemSkeleton key={i} />,
    []
  );
  return (
    <ProjectList
      title={f('workspace.allProject')}
      icon={<FolderIcon className="text-primary text-2xl" />}
      projects={Array(4).fill({})}
      renderProject={renderProjectSkeleton}
    />
  );
}

export default memo(LoadingView);
