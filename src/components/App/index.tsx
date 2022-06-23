import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { languages } from '../../i18n/types';
import { useSettingStore } from '../hooks';

interface IAppProps {
  onMount?: () => void;
}

function App(props: IAppProps) {
  const { onMount } = props;
  const { language, localMessages } = useSettingStore();

  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <IntlProvider locale={language} messages={localMessages}>
      <header>{languages[language]}</header>
    </IntlProvider>
  );
}

export default observer(App);
