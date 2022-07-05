import { Card, List, Skeleton } from 'antd';
import { memo } from 'react';
import styles from './index.module.scss';

function ProjectItemPlaceholder() {
  return (
    <List.Item>
      <Card className={styles.wrapper}>
        <div className={styles.foreground}>
          <Skeleton paragraph={false} active />
        </div>
      </Card>
    </List.Item>
  );
}

export default memo(ProjectItemPlaceholder);
