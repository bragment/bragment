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
  const signInButton = await screen.findByText(
    formatMessage(defaultLanguage, 'auth.signInOrSignUp'),
    {
      selector: 'button',
    }
  );
  expect(signInButton).toBeVisible();

  const getPasscodeButton = await screen.findByText(
    formatMessage(defaultLanguage, 'auth.getPasscode'),
    {
      selector: 'button',
    }
  );
  expect(getPasscodeButton).toBeVisible();

  fireEvent(getPasscodeButton, new MouseEvent('click', { bubbles: true }));
  const backToSingIn = await screen.findByText(
    formatMessage(defaultLanguage, 'auth.requiredEmail'),
    {
      selector: 'div',
    }
  );
  expect(backToSingIn).toBeVisible();
});
