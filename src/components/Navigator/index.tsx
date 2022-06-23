import {
  HomeFilled,
  HomeOutlined,
  SettingFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormatMessage } from '../hooks';
import { ERoutePath } from '../RootRouter/types';
import UserAvatar from '../UserAvatar';
import styles from './index.module.scss';

function Navigator() {
  const f = useFormatMessage();
  const location = useLocation();

  const isHomePage = location.pathname === ERoutePath.Home;
  const isSettingPage = location.pathname === ERoutePath.Setting;

  return (
    <Layout.Sider collapsed theme={'light'} className={styles.wrapper}>
      <Layout>
        <Layout.Header>
          <div className={styles.logo}>
            <div className="feature-mark" />
          </div>
        </Layout.Header>
        <Layout.Content>
          <Menu
            selectedKeys={[location.pathname]}
            items={[
              {
                key: ERoutePath.Home,
                icon: isHomePage ? <HomeFilled /> : <HomeOutlined />,
                label: <Link to={ERoutePath.Home}>{f('home')}</Link>,
              },
              {
                key: ERoutePath.Setting,
                icon: isSettingPage ? <SettingFilled /> : <SettingOutlined />,
                label: <Link to={ERoutePath.Setting}>{f('setting')}</Link>,
              },
            ]}
          />
        </Layout.Content>
        <Layout.Footer>
          <UserAvatar />
        </Layout.Footer>
      </Layout>
    </Layout.Sider>
  );
}

export default memo(Navigator);
