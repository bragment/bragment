import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { formatMessage } from '../../i18n';
import { ELanguage } from '../../i18n/types';
import App from './index';

test('app render', async () => {
  render(<App />);
  await waitFor(async () => {
    const pageText = await screen.findByText('home page', {
      selector: 'div',
    });
    expect(pageText).toBeInTheDocument();
  });

  const settingMenuItem = await screen.findByText(
    formatMessage(ELanguage.EN_US, 'setting'),
    {
      selector: 'span>a',
    }
  );
  fireEvent(settingMenuItem, new MouseEvent('click', { bubbles: true }));
  await waitFor(async () => {
    const pageText = await screen.findByText('setting page', {
      selector: 'div',
    });
    expect(pageText).toBeInTheDocument();
  });
});
