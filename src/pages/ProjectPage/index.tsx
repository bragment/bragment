import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRegularImageUrl, getSmallImageUrl } from '../../api/unsplash';
import BoardView from '../../components/BoardView';
import {
  useGetProject,
  useGetProjectAllItems,
  useProjectStore,
} from '../../components/hooks';
import ProgressiveBackground from '../../components/ProgressiveBackground';
import styles from './index.module.scss';

function ProjectPage() {
  const { setCurrent } = useProjectStore();
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data: projectData } = useGetProject(params.objectId!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data: projectAllItemsData } = useGetProjectAllItems(params.objectId!);
  const project = projectData?.project;
  const projectViews = projectAllItemsData?.projectViews;

  useEffect(() => {
    setCurrent(project);
  }, [project, setCurrent]);

  return (
    <div className={styles.wrapper}>
      {project && (
        <ProgressiveBackground
          className={styles.background}
          color={project.color || undefined}
          image={project.image ? getRegularImageUrl(project.image) : undefined}
          placeholder={
            project.image ? getSmallImageUrl(project.image) : undefined
          }
        />
      )}
      {projectViews?.edges?.map((el) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const viewId = el!.node!.objectId;
        return <BoardView objectId={viewId} key={viewId} />;
      })}
    </div>
  );
}

export default memo(ProjectPage);
