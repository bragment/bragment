import { Card as AntCard } from 'antd';
import { memo } from 'react';
import { getSmallImageUrl } from '../../api/unsplash/helpers';
import { useGetProject } from '../hooks';
import ProgressiveBackground from '../ProgressiveBackground';
import styles from './index.module.scss';
interface IProjectProps {
  objectId: string;
}

function Project(props: IProjectProps) {
  const { objectId } = props;
  const { data: projectData } = useGetProject(objectId);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { title, image, color } = projectData!.project!;
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
