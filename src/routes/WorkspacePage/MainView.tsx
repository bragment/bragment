import { Layout } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { IWorkspace } from '../../libs/client/types';
import ProjectListView from './ProjectListView';
import styles from './index.module.scss';

interface IMainViewProps {
  workspace: IWorkspace;
}

function MainView(props: IMainViewProps) {
  const { workspace } = props;

  return (
    <Layout.Content className={styles.mainView}>
      <Scrollbars autoHide>
        <ProjectListView />
      </Scrollbars>
    </Layout.Content>
  );
}

export default memo(MainView);
