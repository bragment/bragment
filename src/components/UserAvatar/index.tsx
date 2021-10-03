import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { observer } from 'mobx-react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { signOut } from '../../api/parse';
import { ESignInDialogTabKey } from '../../stores/types';
import { useDialogStore, useFormatMessage, useUserStore } from '../hooks';

const UserAvatar = () => {
  const { current, setCurrent } = useUserStore();
  const { setSignInDialogVisible } = useDialogStore();
  const f = useFormatMessage();

  const showSignInDialog = () => {
    setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
  };

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
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  ) : (
    <Button type="primary" onClick={showSignInDialog}>
      {f('signIn')}
    </Button>
  );
};

export default observer(UserAvatar);
