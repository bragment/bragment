import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useMyProfileQuery } from '../../libs/react-query';
import { getFirstChar } from '../../utils';
import { useHandleServerApiError, useUserStore } from '../hooks';
import UserAvatarMenu from './Menu';

interface IUserAvatarProps {
  className?: string;
  menuClassName?: string;
}

function UserAvatar(props: IUserAvatarProps) {
  const { className, menuClassName } = props;
  const { me, signedIn, setMe } = useUserStore();
  const handleServerApiError = useHandleServerApiError();
  const { data, error } = useMyProfileQuery(signedIn);

  useEffect(() => {
    if (error) {
      handleServerApiError(error);
    }
  }, [error, handleServerApiError]);

  useEffect(() => {
    if (data) {
      setMe(data.user);
    }
  }, [data, setMe]);

  return (
    <div className={classNames('dropdown', className)}>
      <label tabIndex={0} className="avatar placeholder">
        <div
          className={classNames(
            'ring ring-offset-base-100 ring-offset-2 bg-accent-focus text-accent-content',
            'w-8 rounded-full cursor-pointer'
          )}>
          <span className="text-xl font-bold capitalize">
            {getFirstChar(me?.username || '')}
          </span>
        </div>
      </label>
      <UserAvatarMenu className={menuClassName} />
    </div>
  );
}

export default observer(UserAvatar);
