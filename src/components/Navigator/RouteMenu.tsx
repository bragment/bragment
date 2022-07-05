import {
  HomeFilled,
  HomeOutlined,
  SettingFilled,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IWorkspace } from '../../libs/client/types';
import { useCurrentWorkspaceListQuery } from '../../libs/react-query';
import { useFormatMessage, useUserStore } from '../hooks';
import { ERoutePath } from '../types';
import WorkspaceAvatar from '../WorkspaceAvatar';
import styles from './index.module.scss';

function RouteMenu() {
  const f = useFormatMessage();
  const location = useLocation();
  const { current: currentUser, mainWorkspaceId } = useUserStore();
  const { data: workspaces } = useCurrentWorkspaceListQuery(!!currentUser);
  const [mainWorkspace, setMainWorkspace] = useState<IWorkspace | null>(null);

  const isHomePage = location.pathname === ERoutePath.Home;
  const isSettingPage = location.pathname === ERoutePath.Setting;
  const isWorkspace = location.pathname === ERoutePath.Workspace;

  useEffect(() => {
    const main = currentUser
      ? workspaces?.find((workspace) => workspace._id === mainWorkspaceId)
      : undefined;
    setMainWorkspace(main || null);
  }, [currentUser, workspaces, mainWorkspaceId]);

  return (
    <Menu
      className={styles.routeMenu}
      selectedKeys={[location.pathname]}
      items={[
        {
          key: ERoutePath.Home,
          icon: isHomePage ? <HomeFilled /> : <HomeOutlined />,
          label: <Link to={ERoutePath.Home}>{f('home')}</Link>,
        },
        {
          key: ERoutePath.Workspace,
          icon:
            isWorkspace && mainWorkspace ? (
              <span className={styles.workspaceIcon}>
                <WorkspaceAvatar size="small" workspace={mainWorkspace} />
              </span>
            ) : (
              <TeamOutlined />
            ),
          label: <Link to={ERoutePath.Workspace}>{f('workspace')}</Link>,
        },
        {
          key: ERoutePath.Setting,
          icon: isSettingPage ? <SettingFilled /> : <SettingOutlined />,
          label: <Link to={ERoutePath.Setting}>{f('setting')}</Link>,
        },
      ]}
    />
  );
}

export default observer(RouteMenu);
