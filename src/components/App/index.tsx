import { observer } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import { languages } from '../../i18n/types';
import { useSettingStore } from '../hooks';

function App() {
  const { language, localMessages } = useSettingStore();

  return (
    <IntlProvider locale={language} messages={localMessages}>
      <header>{languages[language]}</header>
    </IntlProvider>
  );
}

export default observer(App);
