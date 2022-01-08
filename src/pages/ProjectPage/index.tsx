import { memo } from 'react';
import { useParams } from 'react-router-dom';
import {
  getRegularImageUrl,
  getSmallImageUrl,
} from '../../api/unsplash/helpers';
import ProgressiveBackground from '../../components/ProgressiveBackground';
import { useGetProjectQuery } from '../../graphql';
import styles from './index.module.scss';

function ProjectPage() {
  const params = useParams();
  const { data } = useGetProjectQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    variables: { id: params.id! },
  });
  const project = data?.project;

  return (
    <div className={styles.wrapper}>
      {project && (
        <ProgressiveBackground
          color={project.color || undefined}
          image={project.image ? getRegularImageUrl(project.image) : undefined}
          placeholder={
            project.image ? getSmallImageUrl(project.image) : undefined
          }
        />
      )}
      <div className={styles.container}>project page</div>
    </div>
  );
}

export default memo(ProjectPage);
