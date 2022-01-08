import { Row } from 'antd';
import { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { a, config, useTrail } from 'react-spring';
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
  const gutter = 16;
  const trail = useTrail(projects.length, {
    config: { ...config.gentle, duration: 140 },
    opacity: 1,
    y: '0px',
    paddingLeft: gutter / 2,
    paddingRight: gutter / 2,
    from: { opacity: 0, y: '32px' },
  });
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        {icon}
        {label}
      </p>
      <Row gutter={[gutter, gutter]}>
        {trail.map((style, index) => {
          const project = projects[index];
          return (
            <a.div
              className="ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-8 ant-col-lg-6 ant-col-xl-4"
              key={project.id}
              style={style}>
              <Link to={`/project/${project.id}`}>
                <ProjectItem project={project} />
              </Link>
            </a.div>
          );
        })}
      </Row>
    </div>
  );
}

export default memo(ProjectList);
