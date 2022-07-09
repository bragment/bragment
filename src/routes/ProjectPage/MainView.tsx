import { Layout, PageHeader } from 'antd';
import { memo } from 'react';
import styles from './index.module.scss';

function MainView() {
  return (
    <Layout.Content className={styles.mainView}>
      <PageHeader />
    </Layout.Content>
  );
}

export default memo(MainView);
