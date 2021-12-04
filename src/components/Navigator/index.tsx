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
      className={styles.wrapper}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}>
      <Menu selectedKeys={[location.pathname]}>
        <Menu.Item key={ERoutePath.HOME} icon={<AppstoreOutlined />}>
          <Link to={ERoutePath.HOME}>{f('home')}</Link>
        </Menu.Item>
        <Menu.Item key={ERoutePath.SETTING} icon={<SettingOutlined />}>
          <Link to={ERoutePath.SETTING}>{f('setting')}</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}

export default memo(Navigator);
