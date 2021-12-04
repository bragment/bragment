import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import {
  defaultLanguage,
  defaultLocalMessages,
  formatMessage,
} from '../../i18n';
import { ELanguage } from '../../i18n/types';
import Router from './index';

test('render router', async () => {
  const { findByText } = render(
    <IntlProvider locale={defaultLanguage} messages={defaultLocalMessages}>
      <Router />
    </IntlProvider>
  );
  const settingMenuItem = await findByText(
    formatMessage(ELanguage.EN_US, 'setting'),
    {
      selector: 'span>a',
    }
  );
  expect(settingMenuItem).toBeInTheDocument();
  let pageText = await findByText('home page', {
    selector: 'div',
  });
  expect(pageText).toBeInTheDocument();
  fireEvent(settingMenuItem, new MouseEvent('click', { bubbles: true }));
  pageText = await findByText('setting page', {
    selector: 'div',
  });
  expect(pageText).toBeInTheDocument();
});
