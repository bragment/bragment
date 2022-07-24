import { memo, useCallback } from 'react';
import { HiOutlineFolder } from 'react-icons/hi';
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
      icon={<HiOutlineFolder className="text-primary text-xl" />}
      projects={Array(4).fill({})}
      renderProject={renderProjectSkeleton}
    />
  );
}

export default memo(LoadingView);
