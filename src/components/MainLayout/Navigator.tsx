import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormatMessage } from '../hooks';
import { ERoutePath } from '../RootRouter/types';
import styles from './index.module.scss';

function Navigator() {
  const f = useFormatMessage();
  const location = useLocation();

  return (
    <Layout.Sider collapsed theme={'light'} className={styles.navigator}>
      <Menu
        selectedKeys={[location.pathname]}
        items={[
          {
            key: ERoutePath.Home,
            icon: <AppstoreOutlined />,
            label: <Link to={ERoutePath.Home}>{f('home')}</Link>,
          },
          {
            key: ERoutePath.Setting,
            icon: <SettingOutlined />,
            label: <Link to={ERoutePath.Setting}>{f('setting')}</Link>,
          },
        ]}
      />
    </Layout.Sider>
  );
}

export default memo(Navigator);
