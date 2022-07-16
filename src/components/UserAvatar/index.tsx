import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useUserProfileQuery } from '../../libs/react-query';
import { getFirstChar } from '../../utils';
import { useHandleServerApiError, useUserStore } from '../hooks';
import UserAvatarMenu from './Menu';

interface IUserAvatarProps {
  className?: string;
  menuClassName?: string;
}

const UserAvatar = (props: IUserAvatarProps) => {
  const { className, menuClassName } = props;
  const { current, signedIn, setCurrent } = useUserStore();
  const handleServerApiError = useHandleServerApiError();
  const { data, error } = useUserProfileQuery(signedIn);

  useEffect(() => {
    if (error) {
      handleServerApiError(error);
    }
  }, [error, handleServerApiError]);

  useEffect(() => {
    if (data) {
      setCurrent(data.user);
    }
  }, [data, setCurrent]);

  return (
    <div className={classNames('dropdown', className)}>
      <label tabIndex={0} className="avatar placeholder">
        <div
          className={classNames(
            'ring ring-offset-base-100 ring-offset-2 bg-accent-focus text-accent-content',
            'w-8 rounded-full cursor-pointer'
          )}>
          <span className="text-xl font-bold">
            {getFirstChar(current?.username || '')}
          </span>
        </div>
      </label>
      <UserAvatarMenu className={menuClassName} />
    </div>
  );
};

export default observer(UserAvatar);
