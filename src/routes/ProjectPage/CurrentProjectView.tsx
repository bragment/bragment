import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import ProgressiveBackground from '../../components/ProgressiveBackground';
import { useProjectQuery } from '../../libs/react-query';
import { getRegularImageUrl, getSmallImageUrl } from '../../libs/unsplash';
import MainView from './MainView';
import SideView from './SideView';
import styles from './index.module.scss';

function CurrentProjectView() {
  const params = useParams();
  const [search] = useSearchParams();
  const { current: currentUser } = useUserStore();
  const projectId = params.id || '';
  const workspaceId = search.get('workspaceId') || undefined;
  const { data: project } = useProjectQuery(
    projectId,
    !!(projectId && currentUser),
    workspaceId
  );
  const background = project?.background;

  return (
    <div className={styles.wrapper}>
      {!!background && (
        <ProgressiveBackground
          className={styles.background}
          color={background.color || undefined}
          image={
            background.image ? getRegularImageUrl(background.image) : undefined
          }
          placeholder={
            background.image ? getSmallImageUrl(background.image) : undefined
          }
        />
      )}
      {!!projectId && (
        <Layout className={styles.foreground}>
          <SideView projectId={projectId} project={project} />
          <MainView />
        </Layout>
      )}
    </div>
  );
}

export default observer(CurrentProjectView);
