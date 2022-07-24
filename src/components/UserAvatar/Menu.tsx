import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiOutlineLogout } from 'react-icons/hi';
import { useAuthSignOut, useFormatMessage } from '../hooks';

interface IUserAvatarMenuProps {
  className?: string;
}

const UserAvatarMenu = (props: IUserAvatarMenuProps) => {
  const { className } = props;
  const f = useFormatMessage();
  const singOut = useAuthSignOut();

  const handleSignOut = () => {
    setTimeout(() => {
      singOut();
    });
  };

  return (
    <ul
      tabIndex={0}
      className={classNames(
        'dropdown-content menu border-base-300 bg-base-200 md:bg-base-100',
        'w-52 p-2 shadow border rounded-box',
        className
      )}>
      <li onClick={handleSignOut}>
        <span>
          <HiOutlineLogout className="text-xl" />
          {f('auth.signOut')}
        </span>
      </li>
    </ul>
  );
};

export default observer(UserAvatarMenu);
