import { Card as AntCard } from 'antd';
import { memo } from 'react';
import styles from './index.module.scss';
export interface IProjectItemProps {
  project: { id: string; title: string };
}

function ProjectItem(props: IProjectItemProps) {
  const { project } = props;
  const { title } = project;
  return (
    <AntCard className={styles.item} bordered={false} hoverable>
      <div>
        <p>{title}</p>
      </div>
    </AntCard>
  );
}

export default memo(ProjectItem);
