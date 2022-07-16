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

  return (
    <div className={classNames('navbar', className)}>
      <div className="flex-none">{prefix}</div>

      <div className="flex-auto font-bold text-2xl pl-4">
        {workspace?.title}
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <HiDotsVertical className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default observer(WorkspaceInstanceView);
