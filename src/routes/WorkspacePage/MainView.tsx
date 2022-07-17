import { Layout } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ProjectListView from './ProjectListView';
import styles from './index.module.scss';

function MainView() {
  return (
    <Layout.Content className={styles.mainView}>
      <Scrollbars autoHide>
        <ProjectListView />
      </Scrollbars>
    </Layout.Content>
  );
}

export default memo(MainView);
