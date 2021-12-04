import { Col, Row } from 'antd';
import { memo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ProjectList from '../../components/ProjectList';
import ProjectCreator from '../../components/ProjectList/Creator';
import styles from './index.module.scss';

function HomePage() {
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

          <ProjectList projects={[]} />
        </div>
      </Scrollbars>
    </div>
  );
}

export default memo(HomePage);
