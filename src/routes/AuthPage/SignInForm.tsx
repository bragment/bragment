import clsx from 'clsx';
import { GithubIcon } from 'lucide-react';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import ThirdPartyButton from './ThirdPartyButton';
import {
  useDialogStore,
  useFormatMessage,
  useSettingStore,
  useUserStore,
} from '@/components/hooks';
import PrimaryButton from '@/components/PrimaryButton';
import { ILocalMessage } from '@/i18n/types';
import { getGithubOauthUrl, githubClientId } from '@/libs/github';
import {
  useAuthEmailPasscodeMutation,
  useAuthSignInMutation,
} from '@/libs/react-query';
import { verifyEmail } from '@/utils';

function SignInForm() {
  const f = useFormatMessage();
  const { setMe } = useUserStore();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passcodeInputRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef('');
  const { toastSuccess, toastWarning } = useDialogStore();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const { isLoading: signInLoading, mutateAsync: signInMutateAsync } =
    useAuthSignInMutation();
  const { isLoading: passcodeLoading, mutateAsync: passcodeMutateAsync } =
    useAuthEmailPasscodeMutation();
  const [waitingSeconds, setWaitingSeconds] = useState(0);
  const isWaiting = waitingSeconds > 0;
  const { language } = useSettingStore();

  const getPasscode = async () => {
    if (passcodeLoading || isWaiting) {
      return;
    }
    const email = emailInputRef.current?.value.trim();
    if (!email) {
      emailInputRef.current?.focus();
      return toastWarning(f('auth.requiredEmail'));
    }
    if (!verifyEmail(email)) {
      emailInputRef.current?.focus();
      return toastWarning(f('auth.invalidEmail'));
    }
    setErrorMessage(undefined);
    try {
      const { token } = await passcodeMutateAsync({ email, language });
      tokenRef.current = token;
      toastSuccess(f('auth.passcodeMailSent'));
      setWaitingSeconds(60);
      passcodeInputRef.current?.focus();
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 400) {
        setErrorMessage('auth.invalidEmail');
      } else {
        setErrorMessage('common.networkError');
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signInLoading) {
      return;
    }
    const token = tokenRef.current;
    if (!token) {
      return toastWarning(f('auth.getPasscodeFirst'));
    }
    setErrorMessage(undefined);
    const formData = new FormData(event.target as HTMLFormElement);
    const fields = {
      token,
      email: formData.get('email')?.toString() || '',
      passcode: formData.get('passcode')?.toString() || '',
      remember: formData.get('remember')?.toString() === 'on' ? true : false,
    };
    try {
      const { user } = await signInMutateAsync(fields);
      setMe(user);
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 400) {
        setErrorMessage('auth.invalidPasscode');
      } else {
        setErrorMessage('common.networkError');
      }
    }
  };

  const handleEmailInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      getPasscode();
    }
  };

  useEffect(() => {
    if (waitingSeconds > 0) {
      setTimeout(() => {
        setWaitingSeconds((s) => s - 1);
      }, 1000);
    }
  }, [waitingSeconds]);

  return (
    <form className={clsx('form-control', 'space-y-4')} onSubmit={handleSubmit}>
      <label className={clsx('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <input
        ref={emailInputRef}
        required
        name="email"
        type="email"
        autoComplete="email"
        maxLength={64}
        placeholder={f('auth.yourEmail')}
        className={clsx('input input-bordered', 'w-full')}
        onKeyDown={handleEmailInputKeyDown}
      />
      <div className="relative flex justify-between items-center">
        <input
          ref={passcodeInputRef}
          required
          name="passcode"
          type="text"
          autoComplete="off"
          maxLength={6}
          placeholder={f('auth.passcode')}
          className={clsx('input input-bordered', 'w-full')}
        />
        <button
          type="button"
          disabled={isWaiting}
          className={clsx('btn', 'ml-4')}
          onClick={getPasscode}>
          {passcodeLoading && <span className="loading loading-spinner" />}
          {isWaiting
            ? f('auth.waitingSeconds', { seconds: waitingSeconds })
            : f('auth.getPasscode')}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <label className={clsx('label', ' cursor-pointer ')}>
          <input
            name="remember"
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-accent"
          />
          <span className="label-text ml-2">{f('auth.rememberMe')}</span>
        </label>
      </div>
      <PrimaryButton
        type="submit"
        loading={signInLoading}
        className={clsx('btn-block')}>
        {f('auth.signInOrSignUp')}
      </PrimaryButton>
      {githubClientId && (
        <ThirdPartyButton
          oauthUrl={getGithubOauthUrl()}
          title={f('auth.continueWithGithub')}
          icon={<GithubIcon className="w-5 h-5" />}
        />
      )}
    </form>
  );
}

export default observer(SignInForm);
