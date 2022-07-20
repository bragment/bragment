import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import { ILocalMessage } from '../../i18n/types';
import { parseApiErrorMessage } from '../../libs/client';
import { EApiErrorMessage } from '../../libs/client/types';
import { useAuthSignInMutation } from '../../libs/react-query';
import { ERoutePath } from '../types';

function SignInForm() {
  const f = useFormatMessage();
  const { setMe } = useUserStore();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const signInMutation = useAuthSignInMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (signInMutation.isLoading) {
        return;
      }
      const formData = new FormData(event.target as HTMLFormElement);
      const fields = {
        username: formData.get('username')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        remember: formData.get('remember')?.toString() === 'on' ? true : false,
      };
      try {
        const { user } = await signInMutation.mutateAsync(fields);
        setMe(user);
      } catch (error: any) {
        const message = parseApiErrorMessage(error);
        if (message === EApiErrorMessage.InvalidPassword) {
          setErrorMessage('auth.invalidUsernameOrPassword');
        } else {
          setErrorMessage('common.networkError');
        }
      }
    },
    [signInMutation, setMe]
  );

  return (
    <form
      className={classNames('form-control', 'space-y-4')}
      onSubmit={handleSubmit}>
      <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <input
        name="username"
        type="text"
        autoComplete="username"
        required
        placeholder={f('auth.usernameOrEmail')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        required
        placeholder={f('auth.password')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <div className="flex justify-between items-center">
        <label className={classNames('label', ' cursor-pointer ')}>
          <input
            name="remember"
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-accent"
          />
          <span className="label-text ml-2">{f('auth.rememberMe')}</span>
        </label>
        <Link to={ERoutePath.AuthForgotPassword}>
          <button type="button" className="btn btn-link text-accent">
            {f('auth.forgotPassword')}
          </button>
        </Link>
      </div>
      <button
        type="submit"
        className={classNames(
          'btn btn-primary btn-block',
          signInMutation.isLoading && 'loading'
        )}>
        {f('auth.signIn')}
      </button>

      <Link to={ERoutePath.AuthSignUp}>
        <button type="button" className="btn btn-link btn-block text-info">
          {f('auth.notHaveAnAccount')}
        </button>
      </Link>
    </form>
  );
}

export default observer(SignInForm);
