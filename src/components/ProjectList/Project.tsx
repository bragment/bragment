import { Card as AntCard } from 'antd';
import { memo } from 'react';
import { getSmallImageUrl } from '../../api/unsplash';
import { IProject } from '../../libs/client/types';
import { useGetProject } from '../hooks';
import ProgressiveBackground from '../ProgressiveBackground';
import styles from './index.module.scss';
interface IProjectProps {
  project: IProject;
}

function Project(props: IProjectProps) {
  const { project } = props;
  const { title, background = {} } = project;
  const { image, color } = background;
  return (
    <AntCard className={styles.project} bordered={false} hoverable>
      <ProgressiveBackground
        className={styles.background}
        color={color || undefined}
        // NOTE: without progressive
        // placeholder={image ? getSmallImageUrl(image) : undefined}
        image={image ? getSmallImageUrl(image) : undefined}
      />
      <div className={styles.foreground}>
        <p className={styles.title}>{title}</p>
      </div>
    </AntCard>
  );
}

export default memo(Project);
