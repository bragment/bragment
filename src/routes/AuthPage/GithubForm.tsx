import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { parseApiErrorMessage } from '../../libs/client';
import { useAuthGithubLoginMutation } from '../../libs/react-query';
import { AUTHENTICATED, THIRD_PARTY_AUTH } from './types';

function GithubForm() {
  const ranRef = useRef(false);
  const [params] = useSearchParams();
  const code = params.get('code');
  const { setMe } = useUserStore();
  const mutation = useAuthGithubLoginMutation();

  const handleSubmit = useCallback(async () => {
    if (mutation.isLoading || !code) {
      return;
    }
    let message: string | undefined;
    try {
      const user = await mutation.mutateAsync({ code });
      message = AUTHENTICATED;
      setMe(user);
    } catch (error: any) {
      message = parseApiErrorMessage(error);
    }
    window.opener.postMessage({ message, name: THIRD_PARTY_AUTH });
  }, [code, mutation, setMe]);

  useEffect(() => {
    // NOTE: skip the second time render in strict mode
    if (ranRef.current) {
      return;
    }
    ranRef.current = true;
    handleSubmit();
  }, [handleSubmit]);

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
