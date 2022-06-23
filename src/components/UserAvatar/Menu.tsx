import { LogoutOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { observer } from 'mobx-react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useFormatMessage, useUserSignOut } from '../hooks';

const UserAvatarMenu = (props: MenuProps) => {
  const f = useFormatMessage();
  const singOut = useUserSignOut();

  const handlers: Record<string, () => void> = {
    signOut: () => {
      setTimeout(() => {
        singOut();
      });
    },
  };

  const handleMenuClick = (info: MenuInfo) => {
    if (info.key in handlers) {
      handlers[info.key]();
    }
  };

  return (
    <Menu
      prefixCls={props.prefixCls}
      onClick={handleMenuClick}
      items={[
        {
          key: 'signOut',
          icon: <LogoutOutlined />,
          label: f('signOut'),
        },
      ]}
    />
  );
};

export default observer(UserAvatarMenu);
