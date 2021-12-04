import { act, render } from '@testing-library/react';
import { formatMessage } from '../../i18n';
import { ELanguage } from '../../i18n/types';
import stores from '../../stores';
import App from './index';

test('render app', async () => {
  const { findByText } = render(<App />);
  act(() => {
    stores.settingStore.setLanguage(ELanguage.EN_US);
  });
  let signInButton = await findByText(
    formatMessage(ELanguage.EN_US, 'signIn'),
    {
      selector: 'button>span',
    }
  );
  expect(signInButton).toBeInTheDocument();
  act(() => {
    stores.settingStore.setLanguage(ELanguage.ZH_CN);
  });
  signInButton = await findByText(formatMessage(ELanguage.ZH_CN, 'signIn'), {
    selector: 'button>span',
  });
  expect(signInButton).toBeInTheDocument();
});
