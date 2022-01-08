import { Space } from 'antd';
import UserAvatar from '../UserAvatar';
import styles from './index.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.rightSide}>
        <Space align="center" className={styles.userActions}>
          <UserAvatar />
        </Space>
      </div>
    </header>
  );
}

export default Header;
