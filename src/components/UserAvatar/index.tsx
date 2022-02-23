import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import {
  IWorkspaceFragment,
  useGetCurrentUserInfoLazyQuery,
} from '../../graphql';
import { ESignInDialogTabKey } from '../../stores/types';
import { useDialogStore, useFormatMessage, useUserStore } from '../hooks';
import UserAvatarMenu from './Menu';

const UserAvatar = () => {
  const { current, setCurrent, setWorkspaces } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();
  const f = useFormatMessage();
  const [getCurrentUserInfo, { error, data }] =
    useGetCurrentUserInfoLazyQuery();

  const showSignInDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
  const showSignUpDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_UP);

  useEffect(() => {
    if (current) {
      getCurrentUserInfo();
    }
  }, [current, getCurrentUserInfo]);
  useEffect(() => {
    if (error) {
      setCurrent(undefined);
    }
  }, [error, setCurrent]);
  useEffect(() => {
    if (data) {
      const workspaces: IWorkspaceFragment[] = [];
      data.viewer.user.workspaces.edges?.forEach((el) => {
        if (el && el.node) {
          workspaces.push(el.node);
        }
      });
      setWorkspaces(workspaces);
    }
  }, [data, setWorkspaces]);

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
