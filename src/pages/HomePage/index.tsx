import { Col, Row } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ProjectList from '../../components/ProjectList';
import ProjectCreator from '../../components/ProjectList/Creator';
import { useGetAllProjectsQuery } from '../../graphql';
import styles from './index.module.scss';

function HomePage() {
  const { data } = useGetAllProjectsQuery();
  const projects = data?.projects;
  return (
    <div className={styles.wrapper}>
      <Scrollbars autoHide>
        <div className={styles.container}>
          <div className={styles.projectCreatorWrapper}>
            <Row gutter={[12, 12]}>
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

export default memo(HomePage);
