import { Col, Row } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ProjectList from '../../components/ProjectList';
import ProjectCreator from '../../components/ProjectList/Creator';
import { usePersonalProjectsQuery } from '../../graphql';
import styles from './index.module.scss';

function HomePage() {
  const { data } = usePersonalProjectsQuery();
  const projects: any[] = [];
  data?.projects.edges?.forEach((el) => {
    if (el?.node) {
      projects.push(el.node);
    }
  });
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

          <ProjectList projects={projects} />
        </div>
      </Scrollbars>
    </div>
  );
}

export default memo(HomePage);
