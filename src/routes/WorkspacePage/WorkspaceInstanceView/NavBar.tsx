import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiDotsVertical } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import { useWorkspaceQuery } from '../../../libs/react-query';
import WorkspaceMenu from './WorkspaceMenu';

interface INavBarProps {
  className?: string;
  prefix?: React.ReactNode;
}

function NavBar(props: INavBarProps) {
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
        'w-48 h-7 rounded animate-pulse'
      )}
    />
  );

  return (
    <header className={classNames('navbar', 'gap-3 z-30', className)}>
      <div className="flex-none">{prefix}</div>
      <div className="flex-auto font-bold text-xl capitalize">{title}</div>
      <div className="flex-none">
        <div className={classNames('dropdown dropdown-end')}>
          <label tabIndex={0} className="btn btn-square btn-ghost">
            <HiDotsVertical className="text-xl" />
          </label>
          <WorkspaceMenu tabIndex={0} className={'dropdown-content'} />
        </div>
      </div>
    </header>
  );
}

export default observer(NavBar);
