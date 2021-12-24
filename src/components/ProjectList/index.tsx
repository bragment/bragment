import { Col, Row } from 'antd';
import { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IProjectFragment } from '../../graphql';
import ProjectItem from './Item';
import styles from './index.module.scss';

interface IProjectListProps {
  label?: string;
  icon?: ReactNode;
  projects: IProjectFragment[];
}

function ProjectList(props: IProjectListProps) {
  const { label, icon, projects } = props;
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        {icon}
        {label}
      </p>
      <Row gutter={[12, 12]}>
        {projects.map((project) => (
          <Col xl={4} lg={6} md={8} sm={12} xs={24} key={project.id}>
            <Link to={`/project/${project.id}`}>
              <ProjectItem project={project} />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default memo(ProjectList);
