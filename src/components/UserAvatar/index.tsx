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
  const avatar = me?.avatar;

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
            'relative w-8 rounded-full cursor-pointer bg-cover'
          )}
          style={{ backgroundImage: avatar ? `url(${avatar})` : undefined }}>
          <span
            className={classNames(
              'absolute text-xl font-bold capitalize',
              avatar && 'hidden'
            )}>
            {getFirstChar(me?.name || me?.username || '')}
          </span>
        </div>
      </label>
      <UserAvatarMenu className={menuClassName} />
    </div>
  );
}

export default observer(UserAvatar);
