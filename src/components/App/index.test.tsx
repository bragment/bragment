import { render, screen } from '@testing-library/react';
import { ELanguage, languages } from '../../i18n/types';
import stores from '../../stores';
import App from './index';

test('renders app', () => {
  render(<App />);
  stores.settingStore.setLanguage(ELanguage.EN_US);
  let headerElement = screen.getByText(languages[ELanguage.EN_US]);
  expect(headerElement).toBeInTheDocument();
  stores.settingStore.setLanguage(ELanguage.ZH_CN);
  headerElement = screen.getByText(languages[ELanguage.ZH_CN]);
  expect(headerElement).toBeInTheDocument();
});
