import { List, PageHeader, Space } from 'antd';
import { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ProjectItem from '../../components/ProjectItem';
import ProjectItemPlaceholder from '../../components/ProjectItem/Placeholder';
import { IProject } from '../../libs/client/types';
import { ERoutePath } from '../../routes/types';

interface IProjectListProps {
  title: string;
  icon?: ReactNode;
  projects?: IProject[];
  loading?: boolean;
}

export const LIST_GRID = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 6,
  xxl: 6,
};

function ProjectList(props: IProjectListProps) {
  const { icon, title, projects, loading } = props;

  const renderItem = (project: IProject) => (
    <Link
      key={project._id}
      to={
        ERoutePath.Project.replace(':id', project._id) +
        `?workspaceId=${project.workspace}`
      }>
      <ProjectItem project={project} />
    </Link>
  );
  const renderItemPlaceholder = () => <ProjectItemPlaceholder />;

  return (
    <PageHeader
      title={
        <Space>
          {icon}
          {title}
        </Space>
      }
      extra={[]}>
      <List
        grid={LIST_GRID}
        dataSource={loading ? Array(4).fill(0) : projects}
        renderItem={loading ? renderItemPlaceholder : renderItem}
      />
    </PageHeader>
  );
}

export default memo(ProjectList);
