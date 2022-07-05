import { Card, List } from 'antd';
import { memo } from 'react';
import { IProject } from '../../libs/client/types';
import { getSmallImageUrl } from '../../libs/unsplash';
import ProgressiveBackground from '../ProgressiveBackground';
import styles from './index.module.scss';

export interface IProjectItemProps {
  project: IProject;
}

function ProjectItem(props: IProjectItemProps) {
  const { project } = props;
  const { title, background: { image, color } = {} } = project;

  return (
    <List.Item>
      <Card className={styles.wrapper} bordered={false} hoverable>
        <ProgressiveBackground
          className={styles.background}
          color={color}
          image={image ? getSmallImageUrl(image) : undefined}
        />
        <div className={styles.foreground}>
          <p className={styles.title}>{title}</p>
        </div>
      </Card>
    </List.Item>
  );
}

export default memo(ProjectItem);
