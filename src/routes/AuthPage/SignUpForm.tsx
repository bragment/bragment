import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import { ILocalMessage } from '../../i18n/types';
import { parseApiErrorMessage } from '../../libs/client';
import { EApiErrorMessage } from '../../libs/client/types';
import { useAuthSignUpMutation } from '../../libs/react-query';
import { ERoutePath } from '../types';

function SignUpForm() {
  const f = useFormatMessage();
  const { setCurrent } = useUserStore();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const signUpMutation = useAuthSignUpMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setInvalidUsername(false);
      setInvalidEmail(false);
      if (signUpMutation.isLoading) {
        return;
      }
      const formData = new FormData(event.target as HTMLFormElement);
      const fields = {
        username: formData.get('username')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        email: formData.get('email')?.toString() || '',
      };
      try {
        const { user } = await signUpMutation.mutateAsync(fields);
        setCurrent(user);
      } catch (error: any) {
        switch (parseApiErrorMessage(error)) {
          case EApiErrorMessage.UsernameTaken:
            setErrorMessage('auth.existingUsername');
            setInvalidUsername(true);
            break;
          case EApiErrorMessage.EmailTaken:
            setErrorMessage('auth.existingEmail');
            setInvalidEmail(true);
            break;
          case EApiErrorMessage.UsernameAndEmailTaken:
            setErrorMessage('auth.existingUsernameAndEmail');
            setInvalidUsername(true);
            setInvalidEmail(true);
            break;
          default:
            setErrorMessage('networkError');
            break;
        }
      }
    },
    [signUpMutation, setCurrent]
  );

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <input
        name="username"
        type="text"
        autoComplete="username"
        required
        placeholder={f('auth.username')}
        className={classNames(
          'input input-bordered',
          'w-full',
          invalidUsername && 'input-error'
        )}
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder={f('auth.email')}
        className={classNames(
          'input input-bordered',
          'w-full',
          invalidEmail && 'input-error'
        )}
      />
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        required
        placeholder={f('auth.password')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <button
        type="submit"
        className={classNames(
          'btn btn-accent btn-block',
          signUpMutation.isLoading && 'loading'
        )}>
        {f('auth.signUp')}
      </button>

      <Link to={ERoutePath.AuthSignIn}>
        <button type="button" className="btn btn-link btn-block text-info">
          {f('auth.haveAnAccount')}
        </button>
      </Link>
    </form>
  );
}

export default observer(SignUpForm);
