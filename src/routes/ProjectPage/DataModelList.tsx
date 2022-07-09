import {
  DatabaseOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { List, PageHeader, Space } from 'antd';
import { memo, useState } from 'react';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import MenuOption from '../../components/MenuOption';
import { useProjectQuery } from '../../libs/react-query';
import CreateDataModelForm from './CreateDataModelForm';
import styles from './index.module.scss';

interface ISideViewProps {
  projectId: string;
}

function SideView(props: ISideViewProps) {
  const { projectId } = props;
  const [createDataModelInputVisible, setCreateDataModelInputVisible] =
    useState(false);
  const { current: currentUser } = useUserStore();
  const { data: project } = useProjectQuery(projectId, !!currentUser);
  const f = useFormatMessage();
  const showCreateModelInput = () => setCreateDataModelInputVisible(true);
  const hideCreateModelInput = () => setCreateDataModelInputVisible(false);
  const handleCreateModelFinish = () => {
    hideCreateModelInput();
  };

  return (
    <PageHeader
      className={styles.dataModelList}
      title={
        <Space>
          <DatabaseOutlined />
          {f('dataModel')}
        </Space>
      }
      extra={[
        <div
          key="create"
          className={styles.createTrigger}
          onClick={showCreateModelInput}>
          <PlusOutlined />
        </div>,
      ]}>
      {createDataModelInputVisible && (
        <CreateDataModelForm
          projectId={projectId}
          onCancel={hideCreateModelInput}
          onFinish={handleCreateModelFinish}
        />
      )}
      <List
        locale={{ emptyText: undefined }}
        dataSource={project?.models.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )}
        renderItem={(model) => (
          <MenuOption
            key={model.createdAt}
            className={styles.item}
            title={model.title}
            suffix={<RightOutlined />}
          />
        )}
      />
    </PageHeader>
  );
}

export default memo(SideView);
