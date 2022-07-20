import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';
import { defaultLanguage, formatMessage } from '../../i18n';
import RootRouter from './index';

test('RootRouter Render', async () => {
  render(
    <App>
      <RootRouter />
    </App>
  );
  const goToForgotPassword = await screen.findByText(
    formatMessage(defaultLanguage, 'auth.forgotPassword'),
    {
      selector: 'button',
    }
  );
  expect(goToForgotPassword).toBeVisible();

  fireEvent(goToForgotPassword, new MouseEvent('click', { bubbles: true }));
  const backToSingIn = await screen.findByText(
    formatMessage(defaultLanguage, 'auth.backToSignIn'),
    {
      selector: 'button',
    }
  );
  expect(backToSingIn).toBeVisible();

  fireEvent(backToSingIn, new MouseEvent('click', { bubbles: true }));
  const goToSignUp = await screen.findByText(
    formatMessage(defaultLanguage, 'auth.notHaveAnAccount'),
    {
      selector: 'button',
    }
  );
  expect(goToSignUp).toBeVisible();
});
