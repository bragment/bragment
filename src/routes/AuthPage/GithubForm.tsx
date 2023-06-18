import clsx from 'clsx';
import { GithubIcon } from 'lucide-react';
import { memo, useCallback, useEffect, useRef } from 'react';
import { AUTHENTICATED, THIRD_PARTY_AUTH } from './types';
import { useUserStore } from '@/components/hooks';
import { parseApiErrorMessage } from '@/libs/client';
import { useAuthGithubLoginMutation } from '@/libs/react-query';
import { getCurrentSearchParam } from '@/utils';

function GithubForm() {
  const ranRef = useRef(false);
  const { setMe } = useUserStore();
  const { isLoading, mutateAsync } = useAuthGithubLoginMutation();
  const code = getCurrentSearchParam('code');

  const handleSubmit = useCallback(async () => {
    if (isLoading || !code) {
      return;
    }
    let message: string | undefined;
    try {
      const user = await mutateAsync({ code });
      message = AUTHENTICATED;
      setMe(user);
    } catch (error: any) {
      message = parseApiErrorMessage(error);
    }
    window.opener.postMessage({ message, name: THIRD_PARTY_AUTH });
  }, [code, isLoading, mutateAsync, setMe]);

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
          className={clsx(
            'animate-ping',
            'h-20 w-20 absolute inline-flex rounded-full bg-base-content opacity-30'
          )}
        />
        <div className="text-base-content opacity-50">
          <GithubIcon className="w-20 h-20" />
        </div>
      </div>
    </div>
  );
}

export default memo(GithubForm);
