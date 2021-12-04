import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import { observer } from 'mobx-react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { signOut } from '../../api/parse';
import { ESignInDialogTabKey } from '../../stores/types';
import { useDialogStore, useFormatMessage, useUserStore } from '../hooks';

const UserAvatar = () => {
  const { current, setCurrent } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();
  const f = useFormatMessage();

  const showSignInDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
  const showSignUpDialog = () =>
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_UP);

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'signOut':
        // NOTE: after dropdown hiding
        setImmediate(() => {
          signOut();
          setCurrent(undefined);
        });
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="signOut" icon={<LogoutOutlined />}>
        {f('signOut')}
      </Menu.Item>
    </Menu>
  );
  return current ? (
    <Dropdown overlay={menu} trigger={['click']}>
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
