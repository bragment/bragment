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
    formatMessage(defaultLanguage, 'forgotPassword'),
    {
      selector: 'span',
    }
  );
  expect(goToForgotPassword).toBeVisible();

  fireEvent(goToForgotPassword, new MouseEvent('click', { bubbles: true }));
  const backToSingIn = await screen.findByText(
    formatMessage(defaultLanguage, 'backToSignIn'),
    {
      selector: 'span',
    }
  );
  expect(backToSingIn).toBeVisible();

  fireEvent(backToSingIn, new MouseEvent('click', { bubbles: true }));
  const goToSignUp = await screen.findByText(
    formatMessage(defaultLanguage, 'notHaveAnAccount'),
    {
      selector: 'span',
    }
  );
  expect(goToSignUp).toBeVisible();
});
