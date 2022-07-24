import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormatMessage } from '../../components/hooks';
import { ILocalMessage } from '../../i18n/types';
import { ERoutePath } from '../types';

function ForgotPasswordForm() {
  const f = useFormatMessage();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // TODO: request reset password
      setErrorMessage('common.underConstruction');
    },
    []
  );

  return (
    <form
      className={classNames('form-control', 'space-y-4')}
      onSubmit={handleSubmit}>
      <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <input
        type="email"
        autoComplete="email"
        required
        placeholder={f('auth.yourEmail')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <button type="submit" className="btn btn-accent btn-block">
        {f('auth.sendPasswordResetEmail')}
      </button>

      <Link to={ERoutePath.AuthSignIn}>
        <button type="button" className="btn btn-link btn-block text-info">
          {f('auth.backToSignIn')}
        </button>
      </Link>
    </form>
  );
}

export default memo(ForgotPasswordForm);
