import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { observer } from 'mobx-react';
import { ESignInDialogTabKey } from '../../stores/types';
import { useDialogStore, useFormatMessage, useUserStore } from '../hooks';
import UserAvatarMenu from './Menu';

const UserAvatar = () => {
  const { current } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();
  const f = useFormatMessage();

  const showSignInDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
  const showSignUpDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_UP);

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
