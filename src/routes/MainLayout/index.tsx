import { Layout } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet } from 'react-router-dom';
import DialogContainer from '../../components/DialogContainer';
import Navigator from './Navigator';
import styles from './index.module.scss';

function MainLayout() {
  return (
    <Scrollbars autoHide>
      <Layout className={styles.wrapper}>
        <Navigator />
        <Layout className={styles.body}>
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
        <DialogContainer />
      </Layout>
    </Scrollbars>
  );
}

export default memo(MainLayout);
