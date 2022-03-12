import { Col, Row } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useHandleGraphqlError, useUserStore } from '../../components/hooks';
import ProjectList, { PROJECT_LIST_GUTTER } from '../../components/ProjectList';
import ProjectCreator from '../../components/ProjectList/Creator';
import { GetAllProjectsQuery, useGetAllProjectsLazyQuery } from '../../graphql';
import styles from './index.module.scss';

function HomePage() {
  const handleGraphqlError = useHandleGraphqlError();
  const [getAllProjects, { data, error }] = useGetAllProjectsLazyQuery();
  const { current: currentUser } = useUserStore();
  const [projects, setProjects] = useState<GetAllProjectsQuery['projects']>();

  useEffect(() => {
    if (currentUser) {
      getAllProjects();
    } else {
      setProjects(undefined);
    }
  }, [currentUser, getAllProjects]);

  useEffect(() => {
    setProjects(data?.projects);
  }, [data]);

  useEffect(() => {
    if (error) {
      handleGraphqlError(error);
    }
  }, [error, handleGraphqlError]);

  return (
    <div className={styles.wrapper}>
      <Scrollbars autoHide>
        <div className={styles.container}>
          <div className={styles.projectCreatorWrapper}>
            <Row gutter={[PROJECT_LIST_GUTTER, PROJECT_LIST_GUTTER]}>
              <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                <ProjectCreator />
              </Col>
            </Row>
          </div>

          <ProjectList
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            projectIds={projects?.edges?.map((el) => el!.node!.objectId) || []}
          />
        </div>
      </Scrollbars>
    </div>
  );
}

export default observer(HomePage);
