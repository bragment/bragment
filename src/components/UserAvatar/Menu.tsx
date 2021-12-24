import { LogoutOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { observer } from 'mobx-react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { signOut } from '../../api/parse';
import { useFormatMessage, useUserStore } from '../hooks';

const UserAvatarMenu = (props: MenuProps) => {
  const { setCurrent } = useUserStore();

  const f = useFormatMessage();

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

  return (
    <Menu prefixCls={props.prefixCls} onClick={handleMenuClick}>
      <Menu.Item key="signOut" icon={<LogoutOutlined />}>
        {f('signOut')}
      </Menu.Item>
    </Menu>
  );
};

export default observer(UserAvatarMenu);
