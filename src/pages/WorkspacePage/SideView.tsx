import { Layout, PageHeader } from 'antd';
import { memo } from 'react';
import avatarStyles from '../../components/WorkspaceAvatar/index.module.scss';
import { IWorkspace } from '../../libs/client/types';
import { getFirstChar } from '../../utils';
import styles from './index.module.scss';

interface ISideViewProps {
  workspace: IWorkspace;
}

function SideView(props: ISideViewProps) {
  const { workspace } = props;
  const { title } = workspace;

  return (
    <Layout.Sider theme={'light'} className={styles.sideView} width={360}>
      <PageHeader
        title={title}
        avatar={{
          shape: 'square',
          children: getFirstChar(title),
          className: avatarStyles.wrapper,
        }}
      />
    </Layout.Sider>
  );
}

export default memo(SideView);
