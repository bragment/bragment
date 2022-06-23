import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useUserProfileQuery } from '../../libs/react-query';
import { useHandleServerApiError, useUserStore } from '../hooks';
import UserAvatarMenu from './Menu';
import styles from './index.module.scss';

const UserAvatar = () => {
  const { signedIn } = useUserStore();
  const handleServerApiError = useHandleServerApiError();
  const { error } = useUserProfileQuery(signedIn);

  useEffect(() => {
    if (error) {
      handleServerApiError(error);
    }
  }, [error, handleServerApiError]);

  return (
    <Dropdown
      className={styles.wrapper}
      overlay={<UserAvatarMenu />}
      trigger={['click']}>
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default observer(UserAvatar);
