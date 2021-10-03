import { render, screen } from '@testing-library/react';
import { formatMessage } from '../../i18n';
import { ELanguage } from '../../i18n/types';
import stores from '../../stores';
import App from './index';

test('render app', () => {
  render(<App />);
  stores.settingStore.setLanguage(ELanguage.EN_US);
  let signInButton = screen.getByText(
    formatMessage(ELanguage.EN_US, 'signIn'),
    { selector: 'button>span' }
  );
  expect(signInButton).toBeInTheDocument();
  stores.settingStore.setLanguage(ELanguage.ZH_CN);
  signInButton = screen.getByText(
    // NOTE: there is one space between 2 chinese characters.
    formatMessage(ELanguage.ZH_CN, 'signIn').split('').join(' '),
    { selector: 'button>span' }
  );
  expect(signInButton).toBeInTheDocument();
});
