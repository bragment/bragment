import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRegularImageUrl, getSmallImageUrl } from '../../api/unsplash';
import BoardView from '../../components/BoardView';
import {
  useGetProjectAllItemsLazy,
  useGetProjectLazy,
  useProjectStore,
  useUserStore,
} from '../../components/hooks';
import ProgressiveBackground from '../../components/ProgressiveBackground';
import { GetProjectAllItemsQuery } from '../../graphql';
import styles from './index.module.scss';

function ProjectPage() {
  const params = useParams();
  const { current: currentUser } = useUserStore();
  const { current: currentProject, setCurrent: setCurrentProject } =
    useProjectStore();
  const [projectViews, setProjectViews] =
    useState<GetProjectAllItemsQuery['projectViews']>();
  const [getProject, { data: projectData }] = useGetProjectLazy(
    /* eslint-disable @typescript-eslint/no-non-null-assertion */ params.objectId!
  );
  const [getProjectAllItems, { data: projectAllItemsData }] =
    useGetProjectAllItemsLazy(
      /* eslint-disable @typescript-eslint/no-non-null-assertion */ params.objectId!
    );

  useEffect(() => {
    if (currentUser) {
      getProject();
      getProjectAllItems();
    } else {
      setCurrentProject(null);
      setProjectViews(undefined);
    }
  }, [currentUser, getProject, getProjectAllItems, setCurrentProject]);

  useEffect(() => {
    setCurrentProject(projectData?.project || null);
  }, [projectData, setCurrentProject]);

  useEffect(() => {
    setProjectViews(projectAllItemsData?.projectViews);
  }, [projectAllItemsData]);

  return (
    <div className={styles.wrapper}>
      {currentProject && (
        <ProgressiveBackground
          className={styles.background}
          color={currentProject.color || undefined}
          image={
            currentProject.image
              ? getRegularImageUrl(currentProject.image)
              : undefined
          }
          placeholder={
            currentProject.image
              ? getSmallImageUrl(currentProject.image)
              : undefined
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

export default observer(ProjectPage);
