import { Layout } from 'antd';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import DialogContainer from '../DialogContainer';
import Navigator from '../Navigator';
import styles from './index.module.scss';

function MainLayout() {
  return (
    <Layout className={styles.wrapper}>
      <Navigator />
      <Layout className={styles.body}>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
      <DialogContainer />
    </Layout>
  );
}

export default memo(MainLayout);
