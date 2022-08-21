import { memo } from 'react';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import { EApiErrorMessage } from '../../libs/client/types';
import { AUTHENTICATED, THIRD_PARTY_AUTH } from './types';

interface IThirdPartyButtonProps {
  oauthUrl: string;
  title: string;
  icon: React.ReactElement;
}

function ThirdPartyButton(props: IThirdPartyButtonProps) {
  const { oauthUrl, title, icon } = props;
  const f = useFormatMessage();
  const { toastError } = useDialogStore();

  const handleClick = () => {
    const child = window.open(
      oauthUrl,
      THIRD_PARTY_AUTH,
      'popup=true,width=480,height=720'
    );

    window.addEventListener('message', (e) => {
      if (
        e.origin === window.location.origin &&
        e.data.name === THIRD_PARTY_AUTH
      ) {
        child?.close();
        const message = e.data?.message;
        if (message === AUTHENTICATED) {
          return window.location.reload();
        }
        if (message === EApiErrorMessage.InvalidGithubCode) {
          return toastError(f('auth.invalidGithubCode'));
        }
        if (message === EApiErrorMessage.GithubEmailTaken) {
          return toastError(f('auth.githubEmailTaken'));
        }
        return toastError(f('common.networkError'));
      }
    });
  };

  return (
    <button type="button" className="btn" onClick={handleClick}>
      {icon}
      {title}
    </button>
  );
}

export default memo(ThirdPartyButton);
