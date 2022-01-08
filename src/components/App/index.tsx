import { observer } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import { useSettingStore } from '../hooks';
import RootRouter from '../RootRouter';

function App() {
  const { language, localMessages } = useSettingStore();

  return (
    <IntlProvider locale={language} messages={localMessages}>
      <RootRouter />
    </IntlProvider>
  );
}

export default observer(App);
