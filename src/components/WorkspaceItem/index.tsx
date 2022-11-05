import classNames from 'classnames';
import { memo } from 'react';
import { IWorkspace } from '../../libs/client/types';
import WorkspaceAvatar from '../WorkspaceAvatar';

export interface IWorkspaceItemProps {
  workspace: IWorkspace;
}

function WorkspaceItem(props: IWorkspaceItemProps) {
  const { workspace } = props;
  const { title } = workspace;

  return (
    <div
      className={classNames(
        'card bg-base-100 border-base-300',
        'w-full border hover:shadow-xl',
        'clickable'
      )}>
      <div className={classNames('card-body', 'h-15 p-4')}>
        <h2 className={classNames('card-title', 'capitalize')}>
          <WorkspaceAvatar title={title} />
          <div className="block flex-auto overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </div>
        </h2>
      </div>
    </div>
  );
}

export default memo(WorkspaceItem);
