import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import {
  defaultLanguage,
  defaultLocalMessages,
  formatMessage,
} from '../../i18n';
import stores from '../../stores';
import { ESignInDialogTabKey } from '../../stores/types';
import SignInDialog from './index';

test('render app', () => {
  render(
    <IntlProvider locale={defaultLanguage} messages={defaultLocalMessages}>
      <SignInDialog />
    </IntlProvider>
  );
  stores.dialogStore.setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
  const signInButton = screen.getByText(
    formatMessage(defaultLanguage, 'signIn'),
    { selector: 'button>span' }
  );
  expect(signInButton).toBeInTheDocument();
  fireEvent(signInButton, new MouseEvent('click', { bubbles: true }));

  stores.dialogStore.setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_UP);
  const signUpButton = screen.getByText(
    formatMessage(defaultLanguage, 'signUp'),
    { selector: 'button>span' }
  );
  expect(signUpButton).toBeInTheDocument();
  fireEvent(signUpButton, new MouseEvent('click', { bubbles: true }));

  stores.dialogStore.setSignInDialogVisible(
    true,
    ESignInDialogTabKey.FORGOT_PASSWORD
  );
  const sendEmailButton = screen.getByText(
    formatMessage(defaultLanguage, 'sendPasswordResetEmail'),
    { selector: 'button>span' }
  );
  expect(sendEmailButton).toBeInTheDocument();
  fireEvent(sendEmailButton, new MouseEvent('click', { bubbles: true }));
});
