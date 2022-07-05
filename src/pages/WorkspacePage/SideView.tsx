import { LayoutTwoTone, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Layout, PageHeader } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import MenuOption from '../../components/MenuOption';
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
  const { setCreateProjectDialogVisible } = useDialogStore();
  const { current: currentUser } = useUserStore();
  const f = useFormatMessage();
  const isOwner = workspace.owner.users.includes(currentUser?._id || '');

  const handelCreateNewProject = () => {
    setCreateProjectDialogVisible(true);
  };

  return (
    <Layout.Sider theme={'light'} className={styles.sideView} width={280}>
      <Scrollbars autoHide>
        <PageHeader
          title={title}
          avatar={{
            shape: 'square',
            children: getFirstChar(title),
            className: avatarStyles.wrapper,
          }}>
          {isOwner && (
            <MenuOption
              title={f('createNewProject')}
              prefix={<PlusOutlined />}
              onClick={handelCreateNewProject}
            />
          )}
          <MenuOption
            title={f('projectList')}
            active
            prefix={<LayoutTwoTone />}
            suffix={<RightOutlined />}
          />
        </PageHeader>
      </Scrollbars>
    </Layout.Sider>
  );
}

export default memo(SideView);
