import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiDotsVertical } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { useWorkspaceQuery } from '../../libs/react-query';

interface INavBarProps {
  className?: string;
  prefix?: JSX.Element;
}

function WorkspaceInstanceView(props: INavBarProps) {
  const { className, prefix } = props;
  const { current: currentUser } = useUserStore();
  const { workspaceId = '' } = useParams();
  const { data: workspace } = useWorkspaceQuery(
    workspaceId,
    !!(currentUser && workspaceId)
  );
  const title = workspace?.title || (
    <div
      className={classNames(
        'bg-base-content',
        'w-48 h-8 rounded animate-pulse'
      )}
    />
  );
  return (
    <header className={classNames('navbar', 'gap-3', className)}>
      <div className="flex-none">{prefix}</div>
      <div className="flex-auto font-bold text-2xl capitalize">{title}</div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <HiDotsVertical className="text-xl" />
        </button>
      </div>
    </header>
  );
}

export default observer(WorkspaceInstanceView);
