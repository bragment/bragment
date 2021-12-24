import { Card as AntCard } from 'antd';
import { memo } from 'react';
import { IProjectFragment } from '../../graphql';
import styles from './index.module.scss';
interface IProjectItemProps {
  project: IProjectFragment;
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
