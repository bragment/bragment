import { Card as AntCard } from 'antd';
import { memo } from 'react';
import { getSmallImageUrl } from '../../api/unsplash/helpers';
import { IProjectFragment } from '../../graphql';
import ProgressiveBackground from '../ProgressiveBackground';
import styles from './index.module.scss';
interface IProjectItemProps {
  project: IProjectFragment;
}

function ProjectItem(props: IProjectItemProps) {
  const { project } = props;
  const { title, image, color } = project;
  return (
    <AntCard className={styles.item} bordered={false} hoverable>
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

export default memo(ProjectItem);
