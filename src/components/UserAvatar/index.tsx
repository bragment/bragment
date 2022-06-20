import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useUserProfileQuery } from '../../libs/react-query/user';
import { ESignInDialogTabKey } from '../../stores/types';
import {
  useDialogStore,
  useFormatMessage,
  useHandleServerApiError,
  useUserStore,
} from '../hooks';
import UserAvatarMenu from './Menu';

const UserAvatar = () => {
  const { current } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();
  const handleServerApiError = useHandleServerApiError();
  const f = useFormatMessage();
  const { error } = useUserProfileQuery(!!current);

  const showSignInDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SignIn);
  const showSignUpDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SignUp);

  useEffect(() => {
    if (error) {
      handleServerApiError(error);
    }
  }, [error, handleServerApiError]);

  return current ? (
    <Dropdown overlay={<UserAvatarMenu />} trigger={['click']}>
      <Space>
        <Avatar icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  ) : (
    <Space>
      <Button type="text" onClick={showSignInDialog}>
        {f('signIn')}
      </Button>
      {'/'}
      <Button type="text" onClick={showSignUpDialog}>
        {f('signUp')}
      </Button>
    </Space>
  );
};

export default observer(UserAvatar);
