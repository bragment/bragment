import classNames from 'classnames';
import { memo } from 'react';
import { getFirstChar } from '../../utils';

interface IWorkspaceAvatarProps {
  className?: string;
  title?: string;
}

const WorkspaceAvatar = (props: IWorkspaceAvatarProps) => {
  const { className, title } = props;

  return (
    <div className="avatar placeholder">
      <div
        className={classNames(
          'bg-secondary text-secondary-content',
          'w-8 font-bold text-2xl rounded-md',
          className
        )}>
        <span>{getFirstChar(title || '')}</span>
      </div>
    </div>
  );
};

export default memo(WorkspaceAvatar);
