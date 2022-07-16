import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiOutlineLogout } from 'react-icons/hi';
import { useFormatMessage, useUserSignOut } from '../hooks';

interface IUserAvatarMenuProps {
  className?: string;
}

const UserAvatarMenu = (props: IUserAvatarMenuProps) => {
  const { className } = props;
  const f = useFormatMessage();
  const singOut = useUserSignOut();

  const handleSignOut = () => {
    setTimeout(() => {
      singOut();
    });
  };

  return (
    <ul
      tabIndex={0}
      className={classNames(
        'dropdown-content menu bg-base-200 md:bg-base-100',
        'w-52 p-2 shadow rounded-box',
        className
      )}>
      <li onClick={handleSignOut}>
        <span>
          <HiOutlineLogout className="text-xl" />
          {f('signOut')}
        </span>
      </li>
    </ul>
  );
};

export default observer(UserAvatarMenu);
