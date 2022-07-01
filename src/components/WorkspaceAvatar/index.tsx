import { Avatar } from 'antd';
import type { AvatarSize } from 'antd/lib/avatar/SizeContext';
import { memo } from 'react';
import { IWorkspace } from '../../libs/client/types';
import { getFirstChar } from '../../utils';
import styles from './index.module.scss';

export interface IWorkspaceAvatarProps {
  workspace: IWorkspace;
  size?: AvatarSize;
}

function WorkspaceAvatar(props: IWorkspaceAvatarProps) {
  const { workspace, size } = props;
  const { title } = workspace;

  return (
    <Avatar shape="square" size={size} className={styles.wrapper}>
      {getFirstChar(title)}
    </Avatar>
  );
}

export default memo(WorkspaceAvatar);
