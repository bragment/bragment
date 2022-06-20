import { LogoutOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { observer } from 'mobx-react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useUserSignOutMutation } from '../../libs/react-query';
import { useFormatMessage, useUserStore } from '../hooks';

const UserAvatarMenu = (props: MenuProps) => {
  const { setCurrent } = useUserStore();
  const f = useFormatMessage();
  const singOutMutation = useUserSignOutMutation();

  const handlers: Record<string, () => void> = {
    signOut: () => {
      setTimeout(() => {
        setCurrent(null);
        singOutMutation.mutate();
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
