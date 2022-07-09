import { Layout } from 'antd';
import { memo } from 'react';
import UserAvatar from '../../components/UserAvatar';
import RouteMenu from './RouteMenu';
import styles from './index.module.scss';

function Navigator() {
  return (
    <Layout.Sider collapsed theme={'light'} className={styles.navigator}>
      <Layout>
        <Layout.Header>
          <div className={styles.logo}>
            <div className="feature-mark" />
          </div>
        </Layout.Header>
        <Layout.Content>
          <RouteMenu />
        </Layout.Content>
        <Layout.Footer>
          <UserAvatar />
        </Layout.Footer>
      </Layout>
    </Layout.Sider>
  );
}

export default memo(Navigator);
