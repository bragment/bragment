import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ERoutePath } from '../../stores/types';
import { useFormatMessage } from '../hooks';
import styles from './index.module.scss';

function Navigator() {
  const f = useFormatMessage();
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const handleCollapse = (flag: boolean) => {
    setCollapsed(flag);
  };
  return (
    <Layout.Sider
      theme={'light'}
      className={styles.navigator}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}>
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
