import { Layout, PageHeader } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { IProject } from '../../libs/client/types';

import DataModelList from './DataModelList';
import styles from './index.module.scss';

interface ISideViewProps {
  projectId: string;
  project?: IProject;
}

function SideView(props: ISideViewProps) {
  const { projectId, project } = props;

  return (
    <Layout.Sider theme={'light'} className={styles.sideView} width={280}>
      <PageHeader title={project?.title || ' '} className={styles.body}>
        <Scrollbars autoHide className={styles.content}>
          <DataModelList projectId={projectId} />
        </Scrollbars>
      </PageHeader>
    </Layout.Sider>
  );
}

export default memo(SideView);
