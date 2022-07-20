import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiDotsVertical } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import { useWorkspaceQuery } from '../../../libs/react-query';

interface INavBarProps {
  className?: string;
  prefix?: JSX.Element;
}

function WorkspaceInstanceView(props: INavBarProps) {
  const { className, prefix } = props;
  const { me } = useUserStore();
  const { workspaceId = '' } = useParams();
  const { data: workspace } = useWorkspaceQuery(
    workspaceId,
    !!(me && workspaceId)
  );
  const title = workspace ? (
    <>
      <WorkspaceAvatar title={workspace.title} className="mr-3" />
      {workspace.title}
    </>
  ) : (
    <div
      className={classNames(
        'bg-base-content',
        'w-48 h-8 rounded animate-pulse'
      )}
    />
  );

  return (
    <header className={classNames('navbar', 'gap-3 z-30', className)}>
      <div className="flex-none">{prefix}</div>
      <div className="flex-auto font-bold text-xl capitalize">{title}</div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <HiDotsVertical className="text-xl" />
        </button>
      </div>
    </header>
  );
}

export default observer(WorkspaceInstanceView);
