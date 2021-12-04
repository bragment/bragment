import { observer } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import { useSettingStore } from '../hooks';
import Router from '../Router';

function App() {
  const { language, localMessages } = useSettingStore();

  return (
    <IntlProvider locale={language} messages={localMessages}>
      <Router />
    </IntlProvider>
  );
}

export default observer(App);
