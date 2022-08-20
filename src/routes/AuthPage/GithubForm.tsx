import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import { parseApiErrorMessage } from '../../libs/client';
import { EApiErrorMessage } from '../../libs/client/types';
import { useAuthGithubLoginMutation } from '../../libs/react-query';
import { ERoutePath } from '../types';

function GithubForm() {
  const flagRef = useRef(false);
  const [params] = useSearchParams();
  const code = params.get('code');
  const { toastError } = useDialogStore();
  const { setMe } = useUserStore();
  const f = useFormatMessage();
  const navigate = useNavigate();
  const mutation = useAuthGithubLoginMutation();

  const handleSubmit = useCallback(async () => {
    if (mutation.isLoading || !code) {
      return;
    }
    try {
      const { user } = await mutation.mutateAsync({ code });
      setMe(user);
    } catch (error: any) {
      const message = parseApiErrorMessage(error);
      if (message === EApiErrorMessage.InvalidGithubCode) {
        toastError(f('auth.invalidGithubCode'));
      } else if (message === EApiErrorMessage.EmailTaken) {
        toastError(f('auth.githubEmailTakenTips'));
      } else {
        toastError(f('common.networkError'));
      }
      setTimeout(() => {
        navigate(ERoutePath.AuthSignIn, { replace: true });
      }, 2000);
    }
  }, [code, mutation, f, navigate, setMe, toastError]);

  useEffect(() => {
    // NOTE: skip the second time render in strict mode
    if (flagRef.current) {
      return;
    }
    flagRef.current = true;
    if (code) {
      handleSubmit();
    } else {
      navigate(ERoutePath.AuthSignIn, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-20 mt-7 mb-4 flex items-center justify-center">
      <div className="relative">
        <span
          className={classNames(
            'animate-ping',
            'h-24 w-24 absolute inline-flex rounded-full bg-base-content opacity-30'
          )}
        />
        <div className="text-base-content">
          <AiFillGithub className="text-8xl" />
        </div>
      </div>
    </div>
  );
}

export default memo(GithubForm);
