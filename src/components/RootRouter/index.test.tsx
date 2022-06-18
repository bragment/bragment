import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import {
  defaultLanguage,
  defaultLocalMessages,
  formatMessage,
} from '../../i18n';
import { ELanguage } from '../../i18n/types';
import Router from './index';

test('render router', async () => {
  render(
    <IntlProvider locale={defaultLanguage} messages={defaultLocalMessages}>
      <Router />
    </IntlProvider>
  );
  const settingMenuItem = await screen.findByText(
    formatMessage(ELanguage.EN_US, 'setting'),
    {
      selector: 'span>a',
    }
  );
  expect(settingMenuItem).toBeInTheDocument();
  let pageText = await screen.findByText('home page', {
    selector: 'div',
  });
  expect(pageText).toBeInTheDocument();
  fireEvent(settingMenuItem, new MouseEvent('click', { bubbles: true }));
  pageText = await screen.findByText('setting page', {
    selector: 'div',
  });
  expect(pageText).toBeInTheDocument();
});
