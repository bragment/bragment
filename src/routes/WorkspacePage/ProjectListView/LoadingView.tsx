import { memo, useCallback } from 'react';
import { HiFolder } from 'react-icons/hi2';
import { useFormatMessage } from '@/components/hooks';
import ProjectItemSkeleton from '@/components/ProjectItem/Skeleton';
import ProjectList from '@/components/ProjectList';
import { IProject } from '@/libs/client/types';

function LoadingView() {
  const f = useFormatMessage();
  const renderProjectSkeleton = useCallback(
    (_: IProject, i: number) => <ProjectItemSkeleton key={i} />,
    []
  );
  return (
    <ProjectList
      title={f('workspace.allProject')}
      icon={<HiFolder className="h-6 w-6 text-primary" />}
      projects={Array(4).fill({})}
      renderProject={renderProjectSkeleton}
    />
  );
}

export default memo(LoadingView);
